import React from 'react';
import { base_url } from '../config';
import axios from 'axios';
import './One.css';

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      message: '',
      logged: true,
    };
  }
  Login = (ev) => {
    ev.preventDefault();
    let data = {
      username: this.state.username,
      password: this.state.password,
    };
    let url = base_url + '/siswa/login';
    axios
      .post(url, data)
      .then((response) => {
        this.setState({ logged: response.data.logged });
        if (this.state.logged) {
          let siswa = response.data.data;
          localStorage.setItem('siswa', JSON.stringify(siswa));
          localStorage.setItem('nisn', response.data.data.nisn);
          this.props.history.push('/');
        } else {
          window.alert(response.data.message);
        }
      })
      .catch((error) => console.log(error));

    console.log(this.state);
  };
  render() {
    return (
      <div className="login align-items-center">
        <div className="lf">
          <div className="">
            <h1>SMK TELKOM MALANG</h1>
            <h4 className="font-weight-normal">
              Pembayaran SPP dan lain-lainnya
            </h4>
            <h5 className="mt-4">Login | Siswa</h5>
          </div>
          <div className="lf2 mt-4">
            <form onSubmit={(ev) => this.Login(ev)}>
              <input
                className="inputlogin"
                type="text"
                value={this.state.nisn}
                onChange={(ev) => this.setState({ username: ev.target.value })}
                placeholder="Username"
              />
              <input
                type="text"
                className="inputlogin"
                value={this.state.password}
                onChange={(ev) => this.setState({ password: ev.target.value })}
                placeholder="Password"
              />
              <button className="btn-login btn text-white" type="submit">
                LOGIN
              </button>
            </form>
          </div>
        </div>
        <div className="lr">
          <img src="/image/plogin.svg" width="450px" />
        </div>
      </div>
    );
  }
}
