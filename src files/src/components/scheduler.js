import React from 'react'
import UserHeatmap from './user-heatmap'
import UserHeatmapDates from './user-heatmap-dates'
import {DaysInMonth} from '../utilities/date'
import {Content} from '../utilities/content'
import {Users} from '../utilities/data'
import {SplitString} from '../utilities/string'
// import ScrollToComponent from 'react-scroll-to-component'

const WeekDaysShort = Content[window.loc].WeekDaysShort;
const MonthNames = Content[window.loc].MonthNames;
const MonthNamesShort = Content[window.loc].MonthNamesShort;

class Scheduler extends React.Component {
  state = {
    loaded: false,
    hidden: true,
    sort: "trade_name",
    trade_filter: "all",
    date: new Date(),
    selected_day: 0,
    selected_index: 0,
    users_by_id: {},
    users:[]
  };

  componentDidMount() {
    const users = [...Users];
    // setTimeout(()=>{
      let trades = {};
      let users_by_id = {};
      for (var i=0; i < users.length; i++) {
        trades[SplitString(users[i].trade_name,",")] = !!SplitString(users[i].trade_name,",");
        users_by_id[users[i].id] = users[i];
      }
      let trade_names = Object.keys(trades);
      trade_names.sort(function(a, b){
        var x = a.toLowerCase();
        var y = b.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      });
      this.setState({
        trades: trades,
        trade_names: trade_names,
        users: [...users],
        users_by_id: users_by_id,
        trade_filter: "all",
        loaded: true
      });
      if (this.props.selected_job) {
        if (this.props.selected_job_data.start_date) {
          this.gotoDate(this.props.selected_job_data.start_date);
        } else if (this.props.selected_job_data.default_trade && trades[this.props.selected_job_data.default_trade]) {
          this.setState({
            trade_filter: this.props.selected_job_data.default_trade
          });
        }
      }
    // }, 50);
  }

  componentDidUpdate(prevProps) {
    if (this.props.selected_job !== prevProps.selected_job) {
      // this.setState({
      //   hidden: true
      // });
      // setTimeout(()=>{
        // this.setState({hidden: false});
        if (this.props.selected_job_data.start_date) {
          this.setState({
            trade_filter: "all"
          });
          this.gotoDate(this.props.selected_job_data.start_date);
        }
        else {
          this.handleClearSelectedDay();
          if (this.props.selected_job_data.default_trade && this.state.trades[this.props.selected_job_data.default_trade]) {
            this.setState({
              trade_filter: this.props.selected_job_data.default_trade
            });
          } else {
            this.setState({
              trade_filter: "all"
            });
          }
        }
      // }, 500);
    }
  }

  selectSort = (e) => {
    // let id=parseInt(e.currentTarget.dataset.id,10);
    console.log(e.target.value);
    this.setState({sort: e.target.value});
  }

  selectTradeFilter = (e) => {
    // let id=parseInt(e.currentTarget.dataset.id,10);
    console.log(e.target.value);
    this.setState({trade_filter: e.target.value});
  }

  handleJobClick = (project_id, id) => {
    this.props.handleJobClick(project_id, id);
  }

  handleDayClick = (day, index) => {
    this.setState({
      selected_day: day,
      selected_index: index
    });
  }

  handleClearSelectedDay = (e) => {
    this.setState({
      selected_day: 0
    });
  }

  handleNextDay = (e) => {
    let selected_day = this.state.selected_day;
    var current_month = this.state.date;
    if (selected_day === DaysInMonth(current_month.getMonth(), current_month.getFullYear())) {
      this.handleNextMonth();
      selected_day = 1;
    } else {
      selected_day++;
    }
    this.setState({
      selected_day: selected_day
    });
  }
  handlePrevDay = (e) => {
    let selected_day = this.state.selected_day;
    let new_month;
    if (selected_day === 1) {
      new_month = this.handlePrevMonth();
      selected_day = DaysInMonth(new_month.getMonth(), new_month.getFullYear());
    } else {
      selected_day--;
    }
    this.setState({
      selected_day: selected_day
    });
  }

  handleGotoToday = (e) => {
    var today = new Date();
    this.gotoDate(today);
  }

  gotoDate = (date) => {
    this.setState({
      date: date,
      selected_day: date.getDate()
    });
    if (this.props.selected_job_data.assigned_user) {
      if (this[this.props.selected_job_data.assigned_user]) {
        this[this.props.selected_job_data.assigned_user].parentNode.parentNode.scrollTop = this[this.props.selected_job_data.assigned_user].offsetTop-200;
      } else {
        setTimeout(()=>{
          if (this[this.props.selected_job_data.assigned_user]) {
            this[this.props.selected_job_data.assigned_user].parentNode.parentNode.scrollTop = this[this.props.selected_job_data.assigned_user].offsetTop-200;
          }
        }, 100)
      }
    }
  }

  handleNextMonth = (e) => {
    var now = this.state.date;
    var current;
    if (now.getMonth() === 11) {
      current = new Date(now.getFullYear() + 1, 0, 1);
    } else {
      current = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    }
    this.setState({
      date: current
    });
    return current;
  }

  handlePrevMonth = (e) => {
    var now = this.state.date;
    var current;
    if (now.getMonth() === 0) {
      current = new Date(now.getFullYear() - 1, 11, 1);
    } else {
      current = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    }
    this.setState({
      date: current
    });
    return current;
  }

  createRef = (user_id) => {
    return (section) => { this[user_id] = section; };
  }

  render() {
    const user_nodes = [];
    const user_dates = [];
    const trades = [];

    if (this.state.loaded) {
      let users = [...this.state.users];

      for (var t=0; t<this.state.trade_names.length; t++) {
        trades.push((
          <option key={this.state.trade_names[t]} value={this.state.trade_names[t]}>{this.state.trade_names[t]}</option>
        ));
      }
      let sort_value = this.state.sort;
      let trade_value = this.state.trade_filter;
      users.sort(function(a, b){
        var x = a[sort_value] ? (a.trade_name.indexOf(trade_value)===0 ? "a" : a[sort_value].toLowerCase()) : "zzzzzz";
        var y = b[sort_value] ? (b.trade_name.indexOf(trade_value)===0 ? "a" : b[sort_value].toLowerCase()) : "zzzzzz";
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      });
      for (var i=0; i<users.length; i++) {
        if (this.state.trade_filter === "all" || (users[i].trade_name.indexOf(this.state.trade_filter)+1)){
          // if (!this.props.selected_job || users[i].id !== this.props.selected_job_data.assigned_user) {
            user_nodes.push((
              <li key={"user-"+users[i].id}>
                <h3>{users[i].first_name + " " + users[i].last_name}</h3>
                <h4>{SplitString(users[i].trade_name,",")}</h4>
              </li>
            ));
            user_dates.push((
              <li key={"user-"+users[i].id} ref={this.createRef(users[i].id)}>
                <UserHeatmap
                  handleDayClick={this.handleDayClick}
                  handleJobClick={this.handleJobClick}
                  selected_day={this.state.selected_day}
                  selected_index={this.state.selected_index}
                  user={users[i]}
                  month={this.state.date.getMonth()}
                  year={this.state.date.getFullYear()}
                  selected_job={this.props.selected_job}
                  selected_job_data={this.props.selected_job_data}
                  index={i}
                />
              </li>
            ));
          // }
        }
      }
    }

    return (
      <div className={"scheduler" + (this.state.loaded?"":" loading")} >
        <div className="menu">
          <div>
            <div className="select-container">
              <i className="fas fa-sort-alpha-down"></i>
              <select onChange={this.selectSort}>
                <option value="trade_name">sort by trade</option>
                <option value="last_name">sort by last name</option>
                <option value="first_name">sort by first name</option>
              </select>
              <i className="fas fa-caret-down"></i>
            </div>

            <div className="select-container">
              <i className="fas fa-filter"></i>
              <select value={this.state.trade_filter} onChange={this.selectTradeFilter}>
                <option value="all">all</option>
                {trades}
              </select>
              <i className="fas fa-caret-down"></i>
            </div>
          </div>
          {this.state.selected_day ? (
            <div>
              <button onClick={(e)=>{this.handlePrevDay(e)}}><i className="fas fa-angle-left"></i><span>Previous Day</span></button>
              <button onClick={(e)=>{this.handleClearSelectedDay(e)}}><i className="fas fa-angle-up"></i><span>{MonthNames[this.state.date.getMonth()]}</span></button>
              <button onClick={(e)=>{this.handleNextDay(e)}}><span>Next Day</span><i className="fas fa-angle-right"></i></button>
            </div>
          ) : (
            <div>
              <button onClick={(e)=>{this.handlePrevMonth(e)}}><i className="fas fa-angle-left"></i><span>Previous Month</span></button>
              <button onClick={(e)=>{this.handleGotoToday(e)}}><span>Today</span></button>
              <button onClick={(e)=>{this.handleNextMonth(e)}}><span>Next Month</span><i className="fas fa-angle-right"></i></button>
            </div>
          )}
        </div>
        <div className="schedule-grid schedule-grid-header">
          <ul className="user-names">
            <li className="month-name">
              <h3>
                {this.state.selected_day ?
                  WeekDaysShort[new Date(this.state.date.getFullYear(), this.state.date.getMonth(), this.state.selected_day).getDay()] + " " + MonthNamesShort[this.state.date.getMonth()] + " " + this.state.selected_day :
                  MonthNames[this.state.date.getMonth()]
                }
              </h3>
              <h4>{this.state.date.getFullYear()}</h4>
            </li>
            {
              // this.state.loaded && this.props.selected_job && this.props.selected_job_data.assigned_user ?
              // (
              //   <li>
              //     <h3>{this.state.users_by_id[this.props.selected_job_data.assigned_user].first_name + " " + this.state.users_by_id[this.props.selected_job_data.assigned_user].last_name}</h3>
              //     <h4>{this.state.users_by_id[this.props.selected_job_data.assigned_user].trade_name}</h4>
              //   </li>
              // ):[]
            }
          </ul>
          <ul className="heat-maps">
            <li>
              <UserHeatmapDates
                handleDayClick={this.handleDayClick}
                selected_day={this.state.selected_day}
                month={this.state.date.getMonth()}
                year={this.state.date.getFullYear()}
                selected_job={this.props.selected_job}
                selected_job_data={this.props.selected_job_data}
              />
            </li>
            {
              // this.state.loaded && this.props.selected_job && this.props.selected_job_data.assigned_user ?
              // (<li>
              //   <UserHeatmap
              //     handleDayClick={this.handleDayClick}
              //     handleJobClick={this.handleJobClick}
              //     selected_day={this.state.selected_day}
              //     selected_index={this.state.selected_index}
              //     user={this.state.users_by_id[this.props.selected_job_data.assigned_user]}
              //     month={this.state.date.getMonth()}
              //     year={this.state.date.getFullYear()}
              //     selected_job={this.props.selected_job}
              //     selected_job_data={this.props.selected_job_data}
              //     index={i}
              //   />
              // </li>)
              // : []
            }
          </ul>
        </div>
        <div className={"schedule-grid" + (this.state.hidden?"":" hidden")}>
          <ul className="user-names">
          {
            this.state.loaded ?
            user_nodes :
            []
          }
          </ul>
          <ul className="heat-maps">
          {
            this.state.loaded ?
            user_dates :
            []
          }
          </ul>
        </div>
      </div>
    );
  }
}

export default Scheduler
