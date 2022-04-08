import React, { Component } from "react";
import Chart from "react-apexcharts";
import axios from 'axios';
import './index.css'

class App extends Component {

  constructor(props) {

    super(props);
    this.state = {
        options1: {},
        series1 : [{name:"", data:[]},{name:"", data:[]}],
        options2: {},
        series2 : [{name:"", data:[]}],
        dates: [],
        count1: 0,
        count2: 0,
    };
    this.stock = window.location.href.split("/")[4]
    this.checkingSeries1();

  }

  checkingOptions1() {
      return {
        chart: {
          id: "basic-1"
        },
        stroke: {
          curve: 'smooth',
          width:2
        },
        xaxis: {
            categories: this.state.dates
          },
      }
  }
  checkingOptions2() {
      return {
        chart: {
          id: "basic-2"
        },
        stroke: {
          curve: 'smooth',
          width:2
        },
        xaxis: {
            categories: this.state.dates
          },
      }
  }


  checkingSeries1() {

    const api = "http://localhost:1212/go-api/fetch-stock-data?ticker=" + this.stock + "&page=1&limit=300"

    axios.get(api)
    .then(res => {
        this.state.dates = res.data.response.items.trade_date
        this.state.series1[0].name = "High"
        this.state.series1[0].data = res.data.response.items.highs
        this.state.series1[1].name = "Low"
        this.state.series1[1].data = res.data.response.items.lows

        this.state.series2[0].name = "Close"
        this.state.series2[0].data = res.data.response.items.closes

        this.state.options1 = this.checkingOptions1()
        this.state.options2 = this.checkingOptions2()
    })
  }

  render() {

    return (
        <div>

            <button className="example-button" onClick={() => this.setState({ count1 : this.state.count1 + 1})}>
                High Vs Low
            </button>

            {
                this.state.count1 >= 1 ?
                 <div className="app">
                   <div className="row">
                     <div className="mixed-chart">
                       <Chart
                         options={this.state.options1}
                         series={this.state.series1}
                         type="line"
                         width="98%"
                         height="200%"
                       />
                     </div>
                   </div>
                 </div>: null
             }

            <button className="example-button" onClick={() => this.setState({ count2 : this.state.count2 + 1})}>
                Market Summary
            </button>

            {
                this.state.count2 >= 1 ?
                 <div className="app">
                   <div className="row">
                     <div className="mixed-chart">
                       <Chart
                         options={this.state.options2}
                         series={this.state.series2}
                         type="line"
                         width="98%"
                         height="200%"
                       />
                     </div>
                   </div>
                 </div>: null
             }

                 <a className="stocks-a" href="/stocks/MMM">MMM</a>
                 <a className="stocks-a" href="/stocks/AOS">AOS</a>
                 <a className="stocks-a" href="/stocks/ABT">ABT</a>
                 <a className="stocks-a" href="/stocks/ABBV">ABBV</a>
                 <a className="stocks-a" href="/stocks/ABMD">ABMD</a>
                 <a className="stocks-a" href="/stocks/ACN">ACN</a>
                 <a className="stocks-a" href="/stocks/ATVI">ATVI</a>
                 <a className="stocks-a" href="/stocks/ADM">ADM</a>
                 <a className="stocks-a" href="/stocks/ADBE">ADBE</a>
                 <a className="stocks-a" href="/stocks/AAP">AAP</a>
                 <a className="stocks-a" href="/stocks/AMD">AMD</a>
                 <a className="stocks-a" href="/stocks/AES">AES</a>
                 <a className="stocks-a" href="/stocks/AFL">AFL</a>
                 <a className="stocks-a" href="/stocks/A">A</a>
                 <a className="stocks-a" href="/stocks/APD">APD</a>
                 <a className="stocks-a" href="/stocks/AKAM">AKAM</a>
                 <a className="stocks-a" href="/stocks/ALB">ALB</a>
                 <a className="stocks-a" href="/stocks/ALK">ALK</a>
                 <a className="stocks-a" href="/stocks/ARE">ARE</a>
                 <a className="stocks-a" href="/stocks/ALGN">ALGN</a>
                 <a className="stocks-a" href="/stocks/ALLE">ALLE</a>
                 <a className="stocks-a" href="/stocks/LNT">LNT</a>
                 <a className="stocks-a" href="/stocks/ALL">ALL</a>
                 <a className="stocks-a" href="/stocks/GOOGL">GOOGL</a>
                 <a className="stocks-a" href="/stocks/GOOG">GOOG</a>
                 <a className="stocks-a" href="/stocks/MO">MO</a>
                 <a className="stocks-a" href="/stocks/AMZN">AMZN</a>
                 <a className="stocks-a" href="/stocks/AMCR">AMCR</a>
                 <a className="stocks-a" href="/stocks/AEE">AEE</a>
                 <a className="stocks-a" href="/stocks/AAL">AAL</a>
                 <a className="stocks-a" href="/stocks/AEP">AEP</a>
                 <a className="stocks-a" href="/stocks/AXP">AXP</a>
                 <a className="stocks-a" href="/stocks/AIG">AIG</a>
                 <a className="stocks-a" href="/stocks/AMT">AMT</a>
                 <a className="stocks-a" href="/stocks/AWK">AWK</a>
                 <a className="stocks-a" href="/stocks/AMP">AMP</a>
                 <a className="stocks-a" href="/stocks/ABC">ABC</a>
                 <a className="stocks-a" href="/stocks/AME">AME</a>
                 <a className="stocks-a" href="/stocks/AMGN">AMGN</a>
                 <a className="stocks-a" href="/stocks/APH">APH</a>
                 <a className="stocks-a" href="/stocks/ADI">ADI</a>
                 <a className="stocks-a" href="/stocks/ANSS">ANSS</a>
                 <a className="stocks-a" href="/stocks/ANTM">ANTM</a>
                 <a className="stocks-a" href="/stocks/AON">AON</a>
                 <a className="stocks-a" href="/stocks/APA">APA</a>
                 <a className="stocks-a" href="/stocks/AAPL">AAPL</a>
                 <a className="stocks-a" href="/stocks/AMAT">AMAT</a>
                 <a className="stocks-a" href="/stocks/APTV">APTV</a>
                 <a className="stocks-a" href="/stocks/ANET">ANET</a>
                 <a className="stocks-a" href="/stocks/AJG">AJG</a>
                 <a className="stocks-a" href="/stocks/AIZ">AIZ</a>
                 <a className="stocks-a" href="/stocks/T">T</a>
                 <a className="stocks-a" href="/stocks/ATO">ATO</a>
                 <a className="stocks-a" href="/stocks/ADSK">ADSK</a>
                 <a className="stocks-a" href="/stocks/ADP">ADP</a>
                 <a className="stocks-a" href="/stocks/AZO">AZO</a>
                 <a className="stocks-a" href="/stocks/AVB">AVB</a>
                 <a className="stocks-a" href="/stocks/AVY">AVY</a>
                 <a className="stocks-a" href="/stocks/BKR">BKR</a>
                 <a className="stocks-a" href="/stocks/BLL">BLL</a>
                 <a className="stocks-a" href="/stocks/BAC">BAC</a>
                 <a className="stocks-a" href="/stocks/BBWI">BBWI</a>
                 <a className="stocks-a" href="/stocks/BAX">BAX</a>
                 <a className="stocks-a" href="/stocks/BDX">BDX</a>
                 <a className="stocks-a" href="/stocks/BRK.B">BRK.B</a>
                 <a className="stocks-a" href="/stocks/BBY">BBY</a>
                 <a className="stocks-a" href="/stocks/BIO">BIO</a>
                 <a className="stocks-a" href="/stocks/TECH">TECH</a>
                 <a className="stocks-a" href="/stocks/BIIB">BIIB</a>
                 <a className="stocks-a" href="/stocks/BLK">BLK</a>
                 <a className="stocks-a" href="/stocks/BK">BK</a>
                 <a className="stocks-a" href="/stocks/BA">BA</a>
                 <a className="stocks-a" href="/stocks/BKNG">BKNG</a>
                 <a className="stocks-a" href="/stocks/BWA">BWA</a>
                 <a className="stocks-a" href="/stocks/BXP">BXP</a>
                 <a className="stocks-a" href="/stocks/BSX">BSX</a>
                 <a className="stocks-a" href="/stocks/BMY">BMY</a>
                 <a className="stocks-a" href="/stocks/AVGO">AVGO</a>
                 <a className="stocks-a" href="/stocks/BR">BR</a>
                 <a className="stocks-a" href="/stocks/BRO">BRO</a>
                 <a className="stocks-a" href="/stocks/BF.B">BF.B</a>
                 <a className="stocks-a" href="/stocks/CHRW">CHRW</a>
                 <a className="stocks-a" href="/stocks/CDNS">CDNS</a>
                 <a className="stocks-a" href="/stocks/CZR">CZR</a>
                 <a className="stocks-a" href="/stocks/CPB">CPB</a>
                 <a className="stocks-a" href="/stocks/COF">COF</a>
                 <a className="stocks-a" href="/stocks/CAH">CAH</a>
                 <a className="stocks-a" href="/stocks/KMX">KMX</a>
                 <a className="stocks-a" href="/stocks/CCL">CCL</a>
                 <a className="stocks-a" href="/stocks/CARR">CARR</a>
                 <a className="stocks-a" href="/stocks/CTLT">CTLT</a>
                 <a className="stocks-a" href="/stocks/CAT">CAT</a>
                 <a className="stocks-a" href="/stocks/CBOE">CBOE</a>
                 <a className="stocks-a" href="/stocks/CBRE">CBRE</a>
                 <a className="stocks-a" href="/stocks/CDW">CDW</a>
                 <a className="stocks-a" href="/stocks/CE">CE</a>
                 <a className="stocks-a" href="/stocks/CNC">CNC</a>
                 <a className="stocks-a" href="/stocks/CNP">CNP</a>
                 <a className="stocks-a" href="/stocks/CDAY">CDAY</a>
                 <a className="stocks-a" href="/stocks/CERN">CERN</a>
                 <a className="stocks-a" href="/stocks/CF">CF</a>
                 <a className="stocks-a" href="/stocks/CRL">CRL</a>
                 <a className="stocks-a" href="/stocks/SCHW">SCHW</a>
                 <a className="stocks-a" href="/stocks/CHTR">CHTR</a>
                 <a className="stocks-a" href="/stocks/CVX">CVX</a>
                 <a className="stocks-a" href="/stocks/CMG">CMG</a>
                 <a className="stocks-a" href="/stocks/CB">CB</a>
                 <a className="stocks-a" href="/stocks/CHD">CHD</a>
                 <a className="stocks-a" href="/stocks/CI">CI</a>
                 <a className="stocks-a" href="/stocks/CINF">CINF</a>
                 <a className="stocks-a" href="/stocks/CTAS">CTAS</a>
                 <a className="stocks-a" href="/stocks/CSCO">CSCO</a>
                 <a className="stocks-a" href="/stocks/C">C</a>
                 <a className="stocks-a" href="/stocks/CFG">CFG</a>
                 <a className="stocks-a" href="/stocks/CTXS">CTXS</a>
                 <a className="stocks-a" href="/stocks/CLX">CLX</a>
                 <a className="stocks-a" href="/stocks/CME">CME</a>
                 <a className="stocks-a" href="/stocks/CMS">CMS</a>
                 <a className="stocks-a" href="/stocks/KO">KO</a>
                 <a className="stocks-a" href="/stocks/CTSH">CTSH</a>
                 <a className="stocks-a" href="/stocks/CL">CL</a>
                 <a className="stocks-a" href="/stocks/CMCSA">CMCSA</a>
                 <a className="stocks-a" href="/stocks/CMA">CMA</a>
                 <a className="stocks-a" href="/stocks/CAG">CAG</a>
                 <a className="stocks-a" href="/stocks/COP">COP</a>
                 <a className="stocks-a" href="/stocks/ED">ED</a>
                 <a className="stocks-a" href="/stocks/STZ">STZ</a>
                 <a className="stocks-a" href="/stocks/CPRT">CPRT</a>
                 <a className="stocks-a" href="/stocks/GLW">GLW</a>
                 <a className="stocks-a" href="/stocks/CTVA">CTVA</a>
                 <a className="stocks-a" href="/stocks/COST">COST</a>
                 <a className="stocks-a" href="/stocks/CTRA">CTRA</a>
                 <a className="stocks-a" href="/stocks/CCI">CCI</a>
                 <a className="stocks-a" href="/stocks/CSX">CSX</a>
                 <a className="stocks-a" href="/stocks/CMI">CMI</a>
                 <a className="stocks-a" href="/stocks/CVS">CVS</a>
                 <a className="stocks-a" href="/stocks/DHI">DHI</a>
                 <a className="stocks-a" href="/stocks/DHR">DHR</a>
                 <a className="stocks-a" href="/stocks/DRI">DRI</a>
                 <a className="stocks-a" href="/stocks/DVA">DVA</a>
                 <a className="stocks-a" href="/stocks/DE">DE</a>
                 <a className="stocks-a" href="/stocks/DAL">DAL</a>
                 <a className="stocks-a" href="/stocks/XRAY">XRAY</a>
                 <a className="stocks-a" href="/stocks/DVN">DVN</a>
                 <a className="stocks-a" href="/stocks/DXCM">DXCM</a>
                 <a className="stocks-a" href="/stocks/FANG">FANG</a>
                 <a className="stocks-a" href="/stocks/DLR">DLR</a>
                 <a className="stocks-a" href="/stocks/DFS">DFS</a>
                 <a className="stocks-a" href="/stocks/DISCA">DISCA</a>
                 <a className="stocks-a" href="/stocks/DISCK">DISCK</a>
                 <a className="stocks-a" href="/stocks/DISH">DISH</a>
                 <a className="stocks-a" href="/stocks/DG">DG</a>
                 <a className="stocks-a" href="/stocks/DLTR">DLTR</a>
                 <a className="stocks-a" href="/stocks/D">D</a>
                 <a className="stocks-a" href="/stocks/DPZ">DPZ</a>
                 <a className="stocks-a" href="/stocks/DOV">DOV</a>
                 <a className="stocks-a" href="/stocks/DOW">DOW</a>
                 <a className="stocks-a" href="/stocks/DTE">DTE</a>
                 <a className="stocks-a" href="/stocks/DUK">DUK</a>
                 <a className="stocks-a" href="/stocks/DRE">DRE</a>
                 <a className="stocks-a" href="/stocks/DD">DD</a>
                 <a className="stocks-a" href="/stocks/DXC">DXC</a>
                 <a className="stocks-a" href="/stocks/EMN">EMN</a>
                 <a className="stocks-a" href="/stocks/ETN">ETN</a>
                 <a className="stocks-a" href="/stocks/EBAY">EBAY</a>
                 <a className="stocks-a" href="/stocks/ECL">ECL</a>
                 <a className="stocks-a" href="/stocks/EIX">EIX</a>
                 <a className="stocks-a" href="/stocks/EW">EW</a>
                 <a className="stocks-a" href="/stocks/EA">EA</a>
                 <a className="stocks-a" href="/stocks/LLY">LLY</a>
                 <a className="stocks-a" href="/stocks/EMR">EMR</a>
                 <a className="stocks-a" href="/stocks/ENPH">ENPH</a>
                 <a className="stocks-a" href="/stocks/ETR">ETR</a>
                 <a className="stocks-a" href="/stocks/EOG">EOG</a>
                 <a className="stocks-a" href="/stocks/EFX">EFX</a>
                 <a className="stocks-a" href="/stocks/EQIX">EQIX</a>
                 <a className="stocks-a" href="/stocks/EQR">EQR</a>
                 <a className="stocks-a" href="/stocks/ESS">ESS</a>
                 <a className="stocks-a" href="/stocks/EL">EL</a>
                 <a className="stocks-a" href="/stocks/ETSY">ETSY</a>
                 <a className="stocks-a" href="/stocks/RE">RE</a>
                 <a className="stocks-a" href="/stocks/EVRG">EVRG</a>
                 <a className="stocks-a" href="/stocks/ES">ES</a>
                 <a className="stocks-a" href="/stocks/EXC">EXC</a>
                 <a className="stocks-a" href="/stocks/EXPE">EXPE</a>
                 <a className="stocks-a" href="/stocks/EXPD">EXPD</a>
                 <a className="stocks-a" href="/stocks/EXR">EXR</a>
                 <a className="stocks-a" href="/stocks/XOM">XOM</a>
                 <a className="stocks-a" href="/stocks/FFIV">FFIV</a>
                 <a className="stocks-a" href="/stocks/FB">FB</a>
                 <a className="stocks-a" href="/stocks/FAST">FAST</a>
                 <a className="stocks-a" href="/stocks/FRT">FRT</a>
                 <a className="stocks-a" href="/stocks/FDX">FDX</a>
                 <a className="stocks-a" href="/stocks/FIS">FIS</a>
                 <a className="stocks-a" href="/stocks/FITB">FITB</a>
                 <a className="stocks-a" href="/stocks/FRC">FRC</a>
                 <a className="stocks-a" href="/stocks/FE">FE</a>
                 <a className="stocks-a" href="/stocks/FISV">FISV</a>
                 <a className="stocks-a" href="/stocks/FLT">FLT</a>
                 <a className="stocks-a" href="/stocks/FMC">FMC</a>
                 <a className="stocks-a" href="/stocks/F">F</a>
                 <a className="stocks-a" href="/stocks/FTNT">FTNT</a>
                 <a className="stocks-a" href="/stocks/FTV">FTV</a>
                 <a className="stocks-a" href="/stocks/FBHS">FBHS</a>
                 <a className="stocks-a" href="/stocks/FOXA">FOXA</a>
                 <a className="stocks-a" href="/stocks/FOX">FOX</a>
                 <a className="stocks-a" href="/stocks/BEN">BEN</a>
                 <a className="stocks-a" href="/stocks/FCX">FCX</a>
                 <a className="stocks-a" href="/stocks/GPS">GPS</a>
                 <a className="stocks-a" href="/stocks/GRMN">GRMN</a>
                 <a className="stocks-a" href="/stocks/IT">IT</a>
                 <a className="stocks-a" href="/stocks/GNRC">GNRC</a>
                 <a className="stocks-a" href="/stocks/GD">GD</a>
                 <a className="stocks-a" href="/stocks/GE">GE</a>
                 <a className="stocks-a" href="/stocks/GIS">GIS</a>
                 <a className="stocks-a" href="/stocks/GM">GM</a>
                 <a className="stocks-a" href="/stocks/GPC">GPC</a>
                 <a className="stocks-a" href="/stocks/GILD">GILD</a>
                 <a className="stocks-a" href="/stocks/GPN">GPN</a>
                 <a className="stocks-a" href="/stocks/GL">GL</a>
                 <a className="stocks-a" href="/stocks/GS">GS</a>
                 <a className="stocks-a" href="/stocks/HAL">HAL</a>
                 <a className="stocks-a" href="/stocks/HBI">HBI</a>
                 <a className="stocks-a" href="/stocks/HAS">HAS</a>
                 <a className="stocks-a" href="/stocks/HCA">HCA</a>
                 <a className="stocks-a" href="/stocks/PEAK">PEAK</a>
                 <a className="stocks-a" href="/stocks/HSIC">HSIC</a>
                 <a className="stocks-a" href="/stocks/HES">HES</a>
                 <a className="stocks-a" href="/stocks/HPE">HPE</a>
                 <a className="stocks-a" href="/stocks/HLT">HLT</a>
                 <a className="stocks-a" href="/stocks/HOLX">HOLX</a>
                 <a className="stocks-a" href="/stocks/HD">HD</a>
                 <a className="stocks-a" href="/stocks/HON">HON</a>
                 <a className="stocks-a" href="/stocks/HRL">HRL</a>
                 <a className="stocks-a" href="/stocks/HST">HST</a>
                 <a className="stocks-a" href="/stocks/HWM">HWM</a>
                 <a className="stocks-a" href="/stocks/HPQ">HPQ</a>
                 <a className="stocks-a" href="/stocks/HUM">HUM</a>
                 <a className="stocks-a" href="/stocks/HBAN">HBAN</a>
                 <a className="stocks-a" href="/stocks/HII">HII</a>
                 <a className="stocks-a" href="/stocks/IBM">IBM</a>
                 <a className="stocks-a" href="/stocks/IEX">IEX</a>
                 <a className="stocks-a" href="/stocks/IDXX">IDXX</a>
                 <a className="stocks-a" href="/stocks/INFO">INFO</a>
                 <a className="stocks-a" href="/stocks/ITW">ITW</a>
                 <a className="stocks-a" href="/stocks/ILMN">ILMN</a>
                 <a className="stocks-a" href="/stocks/INCY">INCY</a>
                 <a className="stocks-a" href="/stocks/IR">IR</a>
                 <a className="stocks-a" href="/stocks/INTC">INTC</a>
                 <a className="stocks-a" href="/stocks/ICE">ICE</a>
                 <a className="stocks-a" href="/stocks/IFF">IFF</a>
                 <a className="stocks-a" href="/stocks/IP">IP</a>
                 <a className="stocks-a" href="/stocks/IPG">IPG</a>
                 <a className="stocks-a" href="/stocks/INTU">INTU</a>
                 <a className="stocks-a" href="/stocks/ISRG">ISRG</a>
                 <a className="stocks-a" href="/stocks/IVZ">IVZ</a>
                 <a className="stocks-a" href="/stocks/IPGP">IPGP</a>
                 <a className="stocks-a" href="/stocks/IQV">IQV</a>
                 <a className="stocks-a" href="/stocks/IRM">IRM</a>
                 <a className="stocks-a" href="/stocks/JBHT">JBHT</a>
                 <a className="stocks-a" href="/stocks/JKHY">JKHY</a>
                 <a className="stocks-a" href="/stocks/J">J</a>
                 <a className="stocks-a" href="/stocks/SJM">SJM</a>
                 <a className="stocks-a" href="/stocks/JNJ">JNJ</a>
                 <a className="stocks-a" href="/stocks/JCI">JCI</a>
                 <a className="stocks-a" href="/stocks/JPM">JPM</a>
                 <a className="stocks-a" href="/stocks/JNPR">JNPR</a>
                 <a className="stocks-a" href="/stocks/KSU">KSU</a>
                 <a className="stocks-a" href="/stocks/K">K</a>
                 <a className="stocks-a" href="/stocks/KEY">KEY</a>
                 <a className="stocks-a" href="/stocks/KEYS">KEYS</a>
                 <a className="stocks-a" href="/stocks/KMB">KMB</a>
                 <a className="stocks-a" href="/stocks/KIM">KIM</a>
                 <a className="stocks-a" href="/stocks/KMI">KMI</a>
                 <a className="stocks-a" href="/stocks/KLAC">KLAC</a>
                 <a className="stocks-a" href="/stocks/KHC"></a>


        </div>



    )

  }
}
export default App;