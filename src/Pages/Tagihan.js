import React, { Fragment } from 'react';
import Navbar from '../Component/Navbar';
import './One.css';
import { base_url } from '../config.js';
import axios from 'axios';
import $ from 'jquery';

export default class Tagihan extends React.Component {
  constructor() {
    super();
    this.state = {
      tagihan: [],
      nisn: '',
      bulan: '',
      tahun: '',
      id_tagihan: '',
    };
    if (localStorage.getItem('nisn')) {
      this.state.nisn = localStorage.getItem('nisn');
    } else {
      window.location = '/login';
    }
  }

  Add = (item) => {
    $('#modal_pembayaran').modal('show');
    this.setState({
      tahun: '',
      bulan: '',
      id_tagihan: item.id_tagihan,
    });
  };

  savePemb = (event) => {
    event.preventDefault();
    $('#modal_pembayaran').modal('hide');
    let sendData = {
      id_tagihan: this.state.id_tagihan,
      id_petugas: 1,
      nisn: this.state.nisn,
      bulan_bayar: this.state.bulan,
      tahun_bayar: this.state.tahun,
    };
    let url = base_url + '/pembayaran';
    axios
      .post(url, sendData)
      .then((response) => {
        window.alert(response.data.message);
        this.getTagihan();
      })
      .catch((error) => console.log(error));
  };

  getTagihan = () => {
    let url = base_url + '/tagihan/' + this.state.nisn;
    axios
      .get(url)
      .then((response) => {
        this.setState({
          tagihan: response.data,
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
    this.getTagihan();
  }
  render() {
    return (
      <Fragment>
        <Navbar />
        <div className="container page-content">
          <h3 className="text-center judul">TAGIHAN</h3>
          {/* <button onClick={() => console.log(this.state)}>cek</button> */}
          <div className="mt-5">
            <table className="table table-striped">
              <thead>
                <tr className="bg-dark text-white d-flex">
                  <th className="text-center col-1">#</th>
                  <th className="col">Bulan</th>
                  <th className="col">Tahun</th>
                  <th className="col-2">Nominal</th>
                  <th className="col-2">Status</th>
                  <th className="col-3"></th>
                </tr>
              </thead>
              <tbody>
                {this.state.tagihan.map((item, index) => (
                  <tr key={index} className="d-flex">
                    <th className="text-center align-middle col-1">
                      {index + 1}
                    </th>
                    <td className="align-middle col">{item.bulan}</td>
                    <td className="align-middle col">{item.tahun}</td>
                    <td className="align-middle col-2">
                      {item.siswa.spp.nominal}
                    </td>
                    <td className="align-middle col-2">
                      {item.konfirmasi === true ? (
                        <span className="badge bg-success text-white">
                          Sudah Dibayar
                        </span>
                      ) : (
                        <span className="badge bg-secondary text-white">
                          Belum Dibayar
                        </span>
                      )}
                    </td>
                    <td className="col-3 pr-5 pl-5">
                      {item.konfirmasi === false ? (
                        <button
                          className="btn btn-sm btn-block btn-warning"
                          onClick={() => this.Add(item)}
                        >
                          Bayar
                        </button>
                      ) : (
                        <div></div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="modal fade mt-5" id="modal_pembayaran">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header bg-dark text-white">
                  <h4>Form Pembayaran</h4>
                </div>
                <div className="modal-body">
                  <form onSubmit={(ev) => this.savePemb(ev)}>
                    Bulan Bayar
                    <input
                      type="text"
                      className="form-control mb-1"
                      onChange={(ev) =>
                        this.setState({ bulan: ev.target.value })
                      }
                      required
                    />
                    Tahun Bayar
                    <input
                      type="text"
                      className="form-control mb-1"
                      onChange={(ev) =>
                        this.setState({ tahun: ev.target.value })
                      }
                      required
                    />
                    <button
                      type="submit"
                      className="btn btn-block btn-dark mt-3"
                    >
                      Simpan
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
