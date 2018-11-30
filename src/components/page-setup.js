import React from 'react'
import {
  Redirect
} from 'react-router-dom'
import {SetSetup} from '../utilities/cookies'

const construction_types = [
  "General Contractor - Commercial",
  "Custom Home Builder",
  "Production Builder",
  "Remodeler - Renovation",
  "Design Build",
  "Specialty Contractor",
  "Subcontractor",
  "Construction Manager",
  "Property Developer",
  "Real Estate Agent",
  "Architect - Designer",
  "Supplier - Vendor",
  "Other"
];

const regions = [
  "North America",
  "Latin America",
  "South America",
  "Europe",
  "Australia",
  "Middle East",
  "Africa",
  "Asia & India",
  "Other"
];

const roles = [
  "Company Owner or Partner",
  "Project Manager",
  "Office Manager",
  "Superintendent",
  "Estimator",
  "Architect",
  "Engineer",
  "Accountant",
  "Other"
];

class PageSetup extends React.Component {
  state = {
    setup_complete: false,
    loading: false,
    slider_state: 0,
    company_name: "",
    phone: "",
    construction_type: "",
    region: "",
    role: ""
  };
  componentDidMount() {
    setTimeout(()=>{
      this.setState({slider_state: 1});
    }, 1000);
  }

  CompleteSetup = () => {
    setTimeout(()=>{
      SetSetup("Setup Complete!");
      this.setState({setup_complete: true});
    },2000);
  };

  HandleChange = (event) => {
    let state = {};
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  HandleCheckboxChange = (event) => {
    let state = {};
    state[event.target.id] = event.target.checked;
    this.setState(state);
  }

  HandleSubmit = (event) => {
      event.preventDefault();
      this.setState({loading: true});
      this.CompleteSetup();
  }

  Validate = (slide) => {
    var slides = [
      this.state.company_name !== "" &&
      this.state.phone !== "" &&
      this.state.construction_type !== "" &&
      this.state.region !== "" &&
      this.state.role !== "",
      true
    ];
    if (slide) {
      return slides[slide-1];
    } else {
      return slides[0] && slides[1];
    }
  }
  render () {

    const construction_type_options = [(<option disabled={true}>construction type</option>)];
    const region_options = [(<option disabled={true}>region</option>)];
    const role_options = [(<option disabled={true}>your role</option>)];

    for (var type in construction_types) {
      construction_type_options.push((
        <option value={construction_types[type]}>{construction_types[type]}</option>
      ));
    }

    for (var region in regions) {
      region_options.push((
        <option value={regions[region]}>{regions[region]}</option>
      ));
    }

    for (var role in roles) {
      role_options.push((
        <option value={roles[role]}>{roles[role]}</option>
      ));
    }

    return (
      <section id="page-setup">
        <div>
          <div className="card f-column f-space-between">
            <form className={"slider t-center" + (this.state.loading?" loading":"")} onSubmit={this.HandleSubmit}>
              <div className={"f-column" + (this.state.slider_state === 1?" active":"")}>
                <h2>Tell us a little about your construction company...</h2>
                <div className="f-column f-center f-a-center f-grow">
                  <p>
                    <input name="company_name" type="text" placeholder="company name" value={this.state.company_name} onChange={this.HandleChange} />
                  </p>
                  <p>
                    <input name="phone" type="text" placeholder="phone number" value={this.state.phone} onChange={this.HandleChange} />
                  </p>
                  <p>
                    <select className={this.state.construction_type?"":"placeholder"} defaultValue="construction type" name="construction_type" onChange={this.HandleChange}>
                      {construction_type_options}
                    </select>
                  </p>
                  <p>
                    <select className={this.state.region?"":"placeholder"} defaultValue="region" name="region" onChange={this.HandleChange}>
                      {region_options}
                    </select>
                  </p>
                  <p>
                    <select className={this.state.role?"":"placeholder"} defaultValue="your role" name="role" onChange={this.HandleChange}>
                      {role_options}
                    </select>
                  </p>
                </div>
                <footer>
                  <button className="next-button"
                    type="button"
                    disabled={
                      this.state.loading ||
                      !this.Validate(1)
                    }
                    onClick={e=>{
                      this.setState({slider_state: 2});
                    }}
                  >
                    <span>next</span>
                  </button>
                </footer>
              </div>
              <div className={"f-column" + (this.state.slider_state === 2?" active":"")}>
                <h2>Which Projul features interest you the most?</h2>
                <div className="f-column f-center f-a-center f-grow">
                  <p>
                    <input id="feature-1" name="feature-1" type="checkbox" onChange={this.HandleCheckboxChange} />
                    <label htmlFor="feature-1">
                      Project Managment!
                    </label>
                  </p>
                  <p>
                    <input id="feature-2" name="feature-2" type="checkbox" onChange={this.HandleCheckboxChange} />
                    <label htmlFor="feature-2">
                      Customer Communication!
                    </label>
                  </p>
                  <p>
                    <input id="feature-3" name="feature-3" type="checkbox" onChange={this.HandleCheckboxChange} />
                    <label htmlFor="feature-3">
                      Project Photo Organization!
                    </label>
                  </p>
                </div>
                <footer>
                  <button className="back-button"
                    type="button"
                    disabled={
                      this.state.loading
                    }
                    onClick={e=>{
                      this.setState({slider_state: 1});
                    }}
                  >
                    <span>back</span>
                  </button>
                  <button className="load-button"
                    disabled={
                      this.state.loading ||
                      !this.Validate(2)
                    }
                  >
                    <span>complete setup</span>
                    <span></span>
                  </button>
                </footer>
              </div>
            </form>
          </div>
        </div>
        {
          this.state.setup_complete && (<Redirect to="/"/>)
        }
      </section>
    );
  }
}

export default PageSetup
