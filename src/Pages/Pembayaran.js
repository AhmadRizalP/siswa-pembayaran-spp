import React from 'react';
import Navbar from '../Component/Navbar';
import './One.css';
import { base_url } from '../config.js';
import axios from 'axios';

export default class Pembayaran extends React.Component {
  constructor() {
    super();
    this.state = {
      pembayaran: [],
      nisn: '',
    };
    if (localStorage.getItem('nisn')) {
      this.state.nisn = localStorage.getItem('nisn');
    } else {
      window.location = '/login';
    }
  }

  getPembayaran = () => {
    let url = base_url + '/pembayaran/' + this.state.nisn;
    axios
      .get(url)
      .then((response) => {
        this.setState({
          pembayaran: response.data,
        });
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status) {
            window.alert(error.response.data.message);
            this.props.history.push('/login');
          }
        } else {
          console.log(error);
        }
      });
  };

  componentDidMount() {
    this.getPembayaran();
  }
  render() {
    return (
      <div>
        <Navbar />
        <div className="container page-content">
          <h3 className="text-center judul">HISTORY PEMBAYARAN</h3>
          <div className="mt-5">
            {this.state.pembayaran.map((item, index) => (
              <div className="card m-1" key={index}>
                <div className="card-body row align-items-center">
                  <div className="col-1 text-center">
                    <h5 className="m-0">{index + 1}</h5>
                  </div>
                  <div className="col">
                    <h6 className="m-0 font-weight-normal">Tagihan</h6>
                    <h6 className="m-0">
                      {item.tagihan.bulan} - {item.tagihan.tahun}
                    </h6>
                  </div>
                  <div className="col">
                    <h6 className="m-0 font-weight-normal">
                      Tanggal Pembayaran
                    </h6>
                    <h6 className="m-0">{item.tgl_bayar}</h6>
                  </div>
                  <div className="col">
                    <h6 className="m-0 font-weight-normal">Nominal</h6>
                    <h6 className="m-0">{item.jumlah_bayar}</h6>
                  </div>
                  <div className="col text-center">
                    {item.konfirmasi === true ? (
                      <span className="badge badge-success">Verified</span>
                    ) : (
                      <span className="badge badge-secondary">
                        Has not been verified
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
