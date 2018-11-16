import React, { Component } from 'react';
import './index.css';
import BootstrapTable from 'react-bootstrap-table-next';
import facade from './apiFacade'
import NavBar from './NavBar'
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

export default class Largeinfo extends Component {
  constructor(){
    super();
    const labels = ["Id", "First Name", "Last Name", "Gender", "Age"]
    this.state = {labels, sizePerPage: 10, page: 1, totalSize: 10000, data:[] }

  }

  async componentDidMount(){
    const {page,sizePerPage} = this.state
    this.handleTableChange("didMount", {page,sizePerPage});
}

  dataConverter = (members) => {
    const users = members.map((obj) => {
      const member = {
        Id: obj.id,
        "First Name": obj.fName,
        "Last Name": obj.lName,
        Gender: obj.gender,
        Age: obj.age,
      }
      return member;
    });
    return users;
  }

  columns = (labels) => {
    const columns = labels.map((label) => {
      const newCol = {
        dataField: label,
        text: label,
      }
      if(label === 'First Name'){
        newCol["sort"] = true
      }
      return newCol;
    });
    return columns;
  }

  handleTableChange = async(type,props) => {
    const { page, sizePerPage, sortField, sortOrder} = props; 
    // console.log(props)  //Monitor this output, when you test this step
    // Currently only suited for fname
    // For dynamic purpose, u can use this: const sortStr=(sortField && sortOrder) ? `&sort=${sortField}&order=${sortOrder}`:"";
    const sortStr=(sortField && sortOrder) ? `&sort=fName&order=${sortOrder}`:"";
    const currentIndex = (page - 1) * sizePerPage;
    const end = currentIndex + sizePerPage;
    const data = await facade.getDummyData(currentIndex,end, sortStr);
    this.setState({ page,sizePerPage, data })
  }


  render(){
    const {page,sizePerPage,totalSize} = this.state;
    var roleNavBar = localStorage.getItem("role")
    // if(this.state.isLoading){
    // return (
    //   <div>
    //     <NavBar role={roleNavBar} />
    //     <h1> large info page</h1>
    //   </div>
    // );
    // }
    return (
      <div>
        <NavBar role={roleNavBar} />
        <h1> Large data users</h1>

    <BootstrapTable
    striped
    remote
    hover
    bootstrap4
    keyField="Id"
    data={this.dataConverter(this.state.data)}
    columns={this.columns(this.state.labels)}
    onTableChange={this.handleTableChange}
    pagination={paginationFactory({ page, sizePerPage, totalSize })}
    filter={ filterFactory()}
    />
    </div>
    );
  }
}