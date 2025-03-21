import uwg from "./uwg"

export const timer = {

    isLoading: true,
    tournamentId: null,
    tournaments: [],
    selectedTournament: 0,
    serverdiff: 0,
    progress: 0,
    progressPercentageRef: null,
    language: 'uk',

    locale: {
        'en': {
            displayFormat: '%%D%% %%daysname%% %%H%% %%hoursname%% %%M%% min. %%S%% sec.',
            displayFormatToStart: '%%D%% %%daysname%% %%H%% %%hoursname%% %%M%% min. %%S%% sec.',
            displayFormatNoDays: '%%H%% %%hoursname%% %%M%% min. %%S%% sec.',
            displayFormatToStartNoDays: '%%H%% %%hoursname%% %%M%% min. %%S%% sec.',
            hours: { many: 'hours', one: 'hour', two: 'hours' },
            days: { many: 'days', one: 'day', two: 'days' },
            endText: 'Tournament finished'
        }
    },

    loadContents() {
        let tournamentsToShow = [this.tournamentId]
        this.isLoading = true
        //console.log('Set isloading = ' + this.isLoading)
        this.error = null
        this.tournaments = []
        let servernow = Math.round(new Date().getTime() / 1000) + this.serverdiff
        uwg.findContainers({ uuid: tournamentsToShow /*, payload__value__datetime_end__gt: nowDateTime */ }, result => {
            if (result.total > 0) {
                //console.log(tournamentsToShow, result.containers)
                for (let i = 0; i < tournamentsToShow.length; i++) {
                    for (let ii = 0; ii < result.containers.length; ii++) {
                        if (result.containers[ii].name === 'math_magic_default_tournament') continue
                        if (result.containers[ii].uuid === tournamentsToShow[i])
                            this.tournaments.push({
                                uuid: result.containers[ii].uuid,
                                owner: result.containers[ii].owner,
                                name: result.containers[ii].name,
                                title: result.containers[ii].payload.value.name.dict[this.language],
                                participants_count: result.containers[ii].payload.value.participants_count,
                                datetime_start: result.containers[ii].payload.value.datetime_start,
                                datetime_end: result.containers[ii].payload.value.datetime_end,
                                datetime_prepared: result.containers[ii].payload.value.datetime_prepared ? result.containers[ii].payload.value.datetime_prepared : result.containers[ii].payload.value.datetime_start - 1209600, // 2 weeks
                                time_to_end: 1,
                                phase: 'waiting',
                                timebarProgressPx: '0',
                                tournament_started: result.containers[ii].payload.value.datetime_start < servernow,
                                table: [],
                                usersLoaded: false
                            })
                    }
                }
            }
            for (let i = 0; i < this.tournaments.length; i++) {
                uwg.findContainers({ payload__type: 111, perm: 'PUBLIC_SERVER_SIDE_ONLY', payload__value__tournament_uuid: this.tournaments[i].uuid, ordering: '-payload.value.score', offset: 0, limit: 20 }, scores => {
                    if (scores.total > 0) {
                        for (let ii = 0; ii < scores.containers.length; ii++) {
                            this.tournaments[i].table.push({
                            name: scores.containers[ii].owner,
                            rank: ii + 1,
                            score: Math.floor(scores.containers[ii].payload.value.score),
                            })
                        }
                    }
                    this.setTournamentTable(this.tournaments[i].table)                    
                    this.tournaments[i].usersLoaded = true
                })
            }
            this.updateTimeToEnd()
        }, error => {
            this.isLoading = false
            //console.log('Set isloading = ' + this.isLoading)
            this.error = error
        })
    },
    
    calcage (secs, num1, num2) {
        let s = (Math.floor(secs / num1) % num2).toString()
        if (this.LeadingZero && s.length < 2)
            s = "0" + s
        return s
    },
    // temporary for one tournament on page
    tournamentTitle: '',
    displayText: '', 
    //
    updateTimeToEnd() {
        let servernow = Math.round(new Date().getTime() / 1000) + this.serverdiff
        //console.log('updateTimeToEnd:', this.tournaments)
        for (let i = 0; i < this.tournaments.length; i++) {
            let displayStr = ""
            let secs = this.tournaments[i].datetime_end - servernow
            let secsToStart = this.tournaments[i].datetime_start - servernow
            // console.log(`secsToStart[${this.tournaments[i].title}] = ${secsToStart}`)
            let displayFormatNoDays = this.locale[this.language].displayFormatNoDays
            let displayFormat = this.locale[this.language].displayFormat
            if (secsToStart > 0) {
                displayFormatNoDays = this.locale[this.language].displayFormatToStartNoDays
                displayFormat = this.locale[this.language].displayFormatToStart
            }
            if (secs < 0) {
                this.tournaments[i].phase = 'finished'
                this.tournaments[i].time_to_end = this.locale[this.language].endText
            } else {
                if (secsToStart > 0) {
                    secs = secsToStart
                    this.tournaments[i].phase = 'waiting'
                } else {
                    this.tournaments[i].phase = 'going'
                }
                let days = this.calcage(secs, 86400,100000)
                if (days>0) {
                    let daysname = this.locale[this.language].days.many
                    let dayString = days.toString()
                    let dayLast = dayString.substring(dayString.length-1,dayString.length)
                    if (this.language !== 'en')
                    {
                        if (dayLast === 1 && days !== 11) daysname = this.locale[this.language].days.one
                        if ((days < 5 || days > 21) && (dayLast === 2 || dayLast === 3 || dayLast === 4))
                            daysname = this.locale[this.language].days.two
                    } else {
                        if (days === 1)
                            daysname = this.locale[this.language].days.one
                        else
                            daysname = this.locale[this.language].days.many
                    }
                    displayStr = displayFormat.replace(/%%D%%/g, days)
                    displayStr = displayStr.replace(/%%daysname%%/g, daysname)
                } else {
                    displayStr = displayFormatNoDays
                }
                let hours = this.calcage(secs, 3600, 3600) % 24
                let hoursname = this.locale[this.language].hours.many
                let hourString = (hours % 24).toString()
                let hourLast = hourString.substring(hourString.length-1, hourString.length)
                if (hourLast === 1 && hours !== 11) hoursname = this.locale[this.language].hours.one
                if ((hours < 5 || hours > 21) && (hourLast === 2 || hourLast === 3 || hourLast === 4))
                    hoursname = this.locale[this.language].hours.two
                displayStr = displayStr.replace(/%%H%%/g, hours)//+' '+hoursname)
                displayStr = displayStr.replace(/%%M%%/g, this.calcage(secs, 60, 60))
                displayStr = displayStr.replace(/%%S%%/g, this.calcage(secs, 1, 60))
                displayStr = displayStr.replace(/%%hoursname%%/g, hoursname)
                this.tournaments[i].time_to_end = displayStr
            }
            if (this.tournaments[i].phase === 'finished')
            {
                this.progress = 1
            } else {
                if (this.tournaments[i].phase === 'waiting') {
                    let secsTotal = this.tournaments[i].datetime_start - this.tournaments[i].datetime_prepared
                    this.progress = (1/secsTotal) * (servernow - this.tournaments[i].datetime_prepared)
                } else {
                    let secsTotal = this.tournaments[i].datetime_end - this.tournaments[i].datetime_start
                    this.progress = (1/secsTotal) * secsToStart * -1
                }
            }
            this.tournamentTitle = this.tournaments[i].title
            this.displayText = this.tournaments[i].time_to_end
            //console.log('PROGRESS: ' + this.progress)
            this.tournaments[i].timebarProgressPx = Math.round(this.timebarProgress100 * this.progress) + 'px'
        }
        this.isLoading = false
        //console.log('Set isloading = ' + this.isLoading)
        this.updateCallback(this.tournamentTitle, this.progress, this.displayText)
        setTimeout(() => { this.updateTimeToEnd() }, 1000)
    },
    
    updateCallback: null,
    setTournamentTable: null,

    init(tournamentId, language = 'uk', setTournamentTable, updateCallback) {
        
        this.tournamentId = tournamentId
        this.language = language
        this.setTournamentTable = setTournamentTable
        this.updateCallback = updateCallback

        uwg.checkMaintenence((err, maintenance) => {
            if (err || maintenance.maintenance) {
                if (err)
                    console.error('Server availability error:', err)
                else
                    console.error('Maintenance in progress.')
                return
            }
            console.log('Server available - continue loading tournament table...')
            this.serverdiff = maintenance.timediff
            this.loadContents()
        })
        return this
    }
}

export default timer