import axios from "axios"
import config from "./config"
import qs from 'querystringify'

axios.defaults.responseType = 'json'

export const uwg = {
  userToken: null,
  userName: null,
  noepToken: null,
  makeHello () {
    // console.log('MyToken is')
  },
  lZero (val, period = 2) {
    let valStr = '' + val
    for (let i = period - 1; i > 0; i--) {
      if (val < Math.pow(10, i)) valStr = '0' + valStr
    }
    return valStr
  },
  formatDate (date, micro = null) {
    // YYYY-MM-DD HH:MM:SS[.000000Z]
    if (typeof date === 'number') {
      date = new Date(date)
    }
    // let strDate = date.getFullYear() + '-' + this.lZero(date.getMonth() + 1) + '-' + this.lZero(date.getDate()) + ' ' + this.lZero(date.getHours()) + ':' + this.lZero(date.getMinutes()) + ':' + this.lZero(date.getSeconds())
    let strDate = date.getUTCFullYear() + '-' + this.lZero(date.getUTCMonth() + 1) + '-' + this.lZero(date.getUTCDate()) + ' ' + this.lZero(date.getUTCHours()) + ':' + this.lZero(date.getUTCMinutes()) + ':' + this.lZero(date.getUTCSeconds())
    if (micro !== null) {
      strDate += '.' + this.lZero(parseInt(micro), 6) + 'Z'
    }
    return strDate
  },
  getFileUrl (fileUuid) {
    return config.ServerRest + '/files/' + fileUuid + '/render/'
  },
  callRestGet (endpoint, params, callback, onerror) {
    params.method = 'get'
    this.callRestApi(endpoint, params, callback, onerror)
  },
  callRestPost (endpoint, params, callback, onerror) {
    params.method = 'post'
    this.callRestApi(endpoint, params, callback, onerror)
  },
  callRestApi (endpoint, params, callback, onerror) {
    // by default it calls data with post/json
    // you can specify method: post to make application/x-www-form-urlencoded call
    // you can specify method: get to make get-call
    // Authorization token added from this.userToken
    let headers = { 'Content-Type': 'application/json' }
    if (this.noepToken === null) {
      if (this.userToken === null || this.userToken === undefined || this.userToken === 'null') {
        if (config.useLocalStorage) this.userToken = localStorage.getItem('ugs_token')
        if (this.userToken === 'null') this.userToken = null
      }
      if (this.userToken !== null && this.userToken !== undefined) {
        headers.Authorization = 'JWT ' + this.userToken
      }
    } else {
      headers.Authorization = 'Bearer NOEP ' + this.noepToken
    }
    if (params.noAuth !== undefined) {
      delete headers.Authorization
      delete params.noAuth
    }
    // console.log('E-Tag: ' + params.etag)
    if (params.etag !== undefined) {
      if (params.etag !== null) {
        headers['If-None-Match'] = params.etag
      }
      // console.log('DELETE ETAG:' + params.etag)
      delete (params.etag)
    }

    let method = 'post'
    let dataValue = JSON.stringify(params)

    if (params['setUserAgent'] !== undefined) {
      headers['User-Agent'] = JSON.stringify({ device_uid: crypto.createHash('sha1').update(this.userName).digest('hex') })
      delete params['setUserAgent']
    }
    if (params.method !== undefined && params.method === 'post') {
      headers['Content-Type'] = 'application/x-www-form-urlencoded'
      delete (params.method)
      dataValue = qs.stringify(params)
    }
    if (params.method !== undefined && params.method === 'get') {
      method = 'get'
      delete headers['Content-Type']
      delete params.method
      dataValue = qs.stringify(params)
    }
    if (params.method !== undefined && params.method === 'delete') {
      method = 'delete'
      delete (params.method)
    }
    // console.log('Call REST endpoint:' + endpoint + 'with headers and params:')
    // console.log(method, headers, params)

    axios({ method: method, url: config.ServerRest + endpoint + (method === 'get' ? (dataValue.length > 0 ? '?' + dataValue : '') : ''), data: (method === 'get' ? {} : dataValue), headers: headers })
      .then(response => {
        callback(response, params)
      })
      .catch(error => {
        let errorMessage = error.message
        if (error.response) {
          if (error.response.data) {
            if (error.response.data.detail) {
              errorMessage = error.response.data.detail
            }
            if (error.response.data.non_field_errors) {
              errorMessage = error.response.data.non_field_errors
            }
            if (error.response.data.email) {
              errorMessage = error.response.data.email
            }
            if (error.response.data.username) {
              errorMessage = error.response.data.username
            }
            if (error.response.data.password1) {
              errorMessage = error.response.data.password1
            }
          }
        }
        console.log('REST Error: ' + errorMessage)
        onerror(this.transformError(errorMessage.toString()), params)
      })
      .then(res => {
        // console.log(res)
      })
  },

  uploadFile (fileInput, name = null, addheaders = {}, callback, onerror) {
    let contentType = 'application/octet-stream'
    if (fileInput.type !== undefined) {
      contentType = fileInput.type
    }
    if (name === null) {
      name = fileInput.name
    }
    let headers = {
      'Content-type': contentType,
      'Content-Disposition': 'attachment; filename="' + name + '"',
      // 'Content-Length': fileInput.size,
      'Instance-Perm': 'PUBLIC'
    }

    if (this.userToken !== null && this.userToken !== undefined) {
      headers.Authorization = 'JWT ' + this.userToken
    }
    let reader = new FileReader()
    reader.onload = () => {
      axios({ method: 'post', url: config.ServerRest + '/files/stream_upload/', headers: Object.assign(headers, addheaders), data: reader.result }).then(response => {
        if (response.status === 201) {
          callback(response.data)
        } else {
          onerror(response)
        }
      }).catch(error => {
        onerror(error)
      })
    }
    reader.readAsArrayBuffer(fileInput)
  },

  deleteFile (uuid, callback, onerror) {
    this.callRestApi('/files/' + uuid + '/', { method: 'delete' }, result => {
      callback(result)
    }, error => {
      onerror(error)
    })
  },

  addUpdateContainer (uuid, data, callback, onerror) {
    let endpoint = '/containers/'
    if (uuid !== null) {
      endpoint += uuid + '/'
      data.method = 'patch'
    }
    delete data.etag
    this.callRestApi(endpoint, data, response => {
      callback(response)
    }, error => { onerror(error) })
  },

  deleteContainer (uuid, callback, onerror) {
    this.callRestApi('/containers/' + uuid + '/', { method: 'delete' }, response => {
      callback(response)
    }, error => { onerror(error) })
  },

  callLuaScript (params, callback, onerror = null) {
    var socket = new WebSocket(config.ServerUwg, ['uwrzwl'])
    if (params.username === undefined && this.userName !== null) {
      if (config.useLocalStorage) params.username = localStorage.getItem('ugs_username') // this.userName
      if (params.username === 'null') params.username = null
      if (params.username == null) params.username = this.userName
    }
    if (this.userToken === null || this.userToken === undefined) {
      if (config.useLocalStorage) this.userToken = localStorage.getItem('ugs_token')
      if (this.userToken === 'null') this.userToken = null
    }
    if (this.userToken !== null && this.userToken !== undefined) {
      params.token = this.userToken
    }
    console.log('Call LUA', params, config.useLocalStorage)
    socket.onopen = function () {
      socket.send(JSON.stringify(params))
      socket.onmessage = function (event) {
        callback(JSON.parse(event.data), socket)
        if (params.connection === undefined && params.connection !== 'keep-alive') {
          console.log('Response recieved - closing uwg connection')
          socket.close()
        } else {
          console.log('Connection Keep-Alive - stay opened')
          console.log(params.connection)
        }
      }
    }
    socket.onerror = function (e) {
      console.log('ERROR FIXED')
      if (onerror) {
        console.log('SEND ERROR CALLBACK')
        onerror(e)
      }
    }
  },
  getContainerByUuid (uuid, response, onerror, etag = null) {
    this.callRestGet('/containers/' + uuid + '/', { etag: etag }, response1 => {
      if (response1.data.url !== undefined) {
        response(this.parseContainer(response1.data))
      } else {
        onerror('not_found')
      }
    }, onerror)
  },
  findContainers (params, callbackFunc) {
    if (params.offset === undefined) params.offset = 0
    if (params.limit === undefined) params.limit = 1000
    this.callRestPost('/containers/paginated_find/', params, result => {
      let response = { total: 0, containers: [] }
      if (result.data.count > 0) {
        response.total = parseInt(result.data.count)
        for (let i = 0; i < result.data.results.length; i++) {
          response.containers.push(this.parseContainer(result.data.results[i]))
        }
      }
      callbackFunc(response)
    }, error => {
      callbackFunc({ error })
    })
  },
  getDefinedOrNull (str) {
    return str === undefined ? null : str
  },
  parseUrlLast (url) {
    if (url !== undefined) {
      let tmp = url.split('/')
      return tmp[tmp.length - 2]
    }
    return null
  },
  getContainerNameFromLink (link) {
    let reLink = /^https:\/\/bristar.studio\/openlink\/([a-f0-9]{32}~(video|book|template|question|lesson|exercise|ex2|test|image|presentation|model|extapp|schoolbook|chapter|quiz2d|gcsvg|gmsvg|ul2|ut2|page|background|gimage|setimage|setsvg|setbackground|setgimage|freeset|freesetchild))/
    let match = link.match(reLink)
    if (match !== undefined && match !== null && match.length !== undefined && match.length === 3)
      return match[1]
    else
      return null
  },
  checkMaintenence (maintenance_callback) {
    axios.get(config.ServerRest + '/servertime/').then(response => {
      let servertime = Math.round(new Date(response.data.now).getTime() / 1000)
      let localtime = Math.round(new Date().getTime() / 1000)
      this.getContainerByUuid(config.uuid.ServerMaintenenceScheduleUuid, response => {
        let duration = parseInt(this.getDefinedOrNull(response.payload.value.duration))
        // eslint-disable-next-line
        let maintenance_start = parseInt(this.getDefinedOrNull(response.payload.value.start_date))
        let maintenance = false
        // eslint-disable-next-line
        let maintenance_end = maintenance_start + duration
        // eslint-disable-next-line
        if (maintenance_start <= servertime && maintenance_end > servertime) {
          // right now Maintenence
          maintenance = true
        }
        // maintenance = true
        maintenance_callback(null, { maintenance, servertime, maintenance_start, maintenance_end, timediff: servertime - localtime })
      }, error => {
        console.log('checkMaintenence error: ' + error)
        maintenance_callback(error)
      })
    })
  },
  checkUserExistence (username, existence_callback) {
    axios.get(config.ServerRest + '/users/' + username + '/').then(response => {
      if (response.data.username === username) {
        existence_callback(true)
      } else {
        existence_callback(false)
      }
    })
    .catch(error => {
      console.log('Catched error:' , error)
      existence_callback(false)
    })
  },
  parseContainer (data, name = null) {
    let container = {}
    container.uuid = this.parseUrlLast(data.url)
    container.owner = this.parseUrlLast(data.owner)
    container.etag = this.getDefinedOrNull(data.etag)
    container.name = this.getDefinedOrNull(data.name)
    container.created = this.getDefinedOrNull(data.created)
    container.last_modified = this.getDefinedOrNull(data.last_modified)
    container.perm = this.getDefinedOrNull(data.perm)
    container.watchdogs = this.getDefinedOrNull(data.watchdogs)
    if (name === null) {
      name = container.name
    }
    let PayloadParsed = false
    /*
    if (typeof containers['container_' + name] === 'function') {
      // console.log('Parser found for ' + name)
      container.payload = containers['container_' + name](this.getDefinedOrNull(data.payload))
      PayloadParsed = true
    } else {
      let type = this.getDefinedOrNull(data.payload.type)
      if (type !== null) {
        if (typeof containers['container_type' + type] === 'function') {
          // console.log('Parser found for type' + type)
          container.payload = containers['container_type' + type](data.payload)
          PayloadParsed = true
        }
      }
    }
    */
    if (!PayloadParsed) {
      container.payload = data.payload
    }
    // console.log('Container with name ' + name + ' parsed:', container, '-----------------------------------------')
    // console.log('TypeOf' + typeof containers[name])
    return container
  },
  transformError (error) {
    switch (error) {
      case 'Request was throttled. Expected available in 1.0 second.':
        return 'rest_throttled'
      case 'Unable to login with provided credentials.':
        return 'rest_unable_to_login'
      case 'This username is already taken. Please choose another.':
        return 'rest_username_exists'
      case 'Not found.':
        return 'rest_not_found'
      case 'Enter a valid email address.':
        return 'rest_invalid_email'
      case 'A user is already registered with this e-mail address.':
        return 'rest_email_exists'
      case 'The password is too similar to the username.':
        return 'rest_password_similar_to_username'
      case 'The password is too similar to the email.':
        return 'rest_password_similar_to_email'
      case 'Password must be a minimum of 6 characters.':
        return 'rest_password_too_short'
      case 'This password is too common.':
        return 'rest_password_too_common'
      case 'You do not have permission to perform this action.':
        return 'rest_no_permission'
      case 'Usernames can only contain letters, digits and @/./+/-/_.':
        return 'rest_wrong_username'
      case 'Request failed with status code 500.':
        return 'rest_500'
      case 'This field may not be blank.':
        return 'form_username_too_short'
      case 'Request failed with status code 400':
        return 'rest_500'
      case 'User doesn\'t exist.':
        return 'rest_user_not_exists'
      case 'Error decoding signature.':
      case 'Signature has expired.':
        if (error === 'Error decoding signature.') {
          error = 'rest_signature_decoding'
        } else {
          error = 'rest_token_expired'
        }
        return error
      case 'Network Error':
        console.log('NETWORK ERROR')
        return 'network_error'
      default:
        return error
    }
  }
}

export default uwg