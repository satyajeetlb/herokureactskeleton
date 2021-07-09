import Header from "./Header"
import React from 'react'
import Workspace from './Workspace'
import FilterWorkspace from './FilterWorkspace'
import Loader from './Loader'
import cross from '../images/cross-white.svg'
import { isNotEmpty } from './Helper'
import { checkSkillsRenderer } from './SearchWorkspaceCellRenderer'
import { postAjaxCall } from './AjaxService'

class SearchWorkspace extends React.Component {
  constructor(props) {
    super(props);

    this.setColumnDefs        = this.setColumnDefs.bind(this);
    this.handleSearchData     = this.handleSearchData.bind(this);
    this.handleSubmit         = this.handleSubmit.bind(this);
    this.getDetails           = this.getDetails.bind(this);
    this.handleFilterChange   = this.handleFilterChange.bind(this);
    this.removeFilterChange   = this.removeFilterChange.bind(this);
    this.columnUpdate         = this.columnUpdate.bind(this);
    this.handlekeys           = this.handlekeys.bind(this);

    this.state = {
      columnDefs      : [],
      rowDefs         : [],
      rowData         : [],
      domain          : [],
      role            : [],
      stage           : [],
      recruiter       : [],
      searchData      : null,
      filterData      : [],
      candidateCount  : 0,

      //flags
      isLoading       : false,
      disabledInput   : false,
      dashboardFlag   : false,
      keyForSkills    : "keyskills",
    }
  }

// componentWillMount() {
//   this.setColumnDefs();
// }

/* functions */

setColumnDefs(data){
  let columnDefs = [
    {
      headerName: "Name",
      menuTabs: ["filterMenuTab", "generalMenuTab"],
      field: "name",
      width: 200,
      filter: false,
      headerClass: "center",
      resizable: true,
      sortable: true,
    },
    {
      headerName: "E-Mail",
      menuTabs: ["filterMenuTab", "generalMenuTab"],
      field: "email",
      width: 250,
      filter: false,
      headerClass: "center",
      resizable: true,
      sortable: true,
    },
    {
      headerName: "Mobile",
      menuTabs: ["filterMenuTab", "generalMenuTab"],
      field: "mobile",
      width: 150,
      filter: false,
      headerClass: "center",
      resizable: true,
      sortable: true,
    },
    {
      headerName: "Skills",
      menuTabs: ["filterMenuTab", "generalMenuTab"],
      field: "skills",
      width: 200,
      filter: false,
      headerClass: "center",
      resizable: true,
      sortable: true,
    },
    {
      headerName: "Candidate Id",
      menuTabs: ["filterMenuTab", "generalMenuTab"],
      field: "candidateId",
      width: 120,
      filter: false,
      headerClass: "center",
      resizable: true,
      sortable: true,
    },
    {
      headerName: "Designation",
      menuTabs: ["filterMenuTab", "generalMenuTab"],
      field: "designation",
      width: 173,
      filter: false,
      headerClass: "center",
      resizable: true,
      sortable: true,
    },
    {
      headerName: "Company Name",
      menuTabs: ["filterMenuTab", "generalMenuTab"],
      field: "companyName",
      width: 190,
      filter: false,
      headerClass: "center",
      resizable: true,
      sortable: true,
    },
    {
      headerName: "Chatbot Status",
      menuTabs: ["filterMenuTab", "generalMenuTab"],
      field: "chatbotStatus",
      width: 135,
      filter: false,
      headerClass: "center",
      resizable: true,
      sortable: true,
    },
    {
      headerName: "Source",
      menuTabs: ["filterMenuTab", "generalMenuTab"],
      field: "source",
      width: 85,
      filter: false,
      headerClass: "center",
      resizable: true,
      sortable: true,
    },
    {
      headerName: "Recruiter",
      menuTabs: ["filterMenuTab", "generalMenuTab"],
      field: "recruiter",
      width: 170,
      filter: false,
      headerClass: "center",
      resizable: true,
      sortable: true,
    },
    {
      headerName: "Resume Link",
      menuTabs: ["filterMenuTab", "generalMenuTab"],
      field: "ResumeLink",
      width: 170,
      filter: false,
      headerClass: "center",
      resizable: true,
      sortable: true,
    },
    {
      headerName: "Parsing Response",
      menuTabs: ["filterMenuTab", "generalMenuTab"],
      field: "parsingResponse",
      width: 180,
      filter: false,
      headerClass: "center",
      resizable: true,
      sortable: true,
    },
  ]

  data.map((item)=>{
    let newColumn = {
      headerName: item,
      menuTabs: ["filterMenuTab", "generalMenuTab"],
      field: '',
      width: 180,
      filter: false,
      headerClass: "center",
      resizable: true,
      sortable: true,
      // cellRendererFramework: checkSkillsRenderer.bind(this)
    }
    columnDefs.push(newColumn)
  })

  this.setState({columnDefs : columnDefs})
}

handleSearchData(e){
  this.setState({searchData : e.target.value})
}

handleSubmit(e){
  if((e!='filter')){
    e.preventDefault()
  }
  const {searchData,keyForSkills,filterData} = this.state;
  // this.handleFilterChange(searchData)
  this.columnUpdate(searchData)
  let api = "https://litmus-universal-search-s1.search.windows.net/indexes/candidate-data-with-skills-mock-index/docs/search?api-version=2020-06-30-Preview&api-key=4D57E5D3CDA68B7FEE822E356B2A5780"
    let data = {
      "search": searchData,
      "queryType": "simple",
      "searchMode": "all",
      "searchFields": keyForSkills,
      "count": "true",
      "facets":  ["role,count:4", "domain,count:4", "stage_name,count:7", "recruiter, count:7"],
      "top": 100,
  }

  if(filterData.length>0){
    let str = ""
    str = str + `${filterData[0][0].toLowerCase()} eq \'${filterData[0][1]}\'`
    if(filterData.length>1){
      for(let i=1;i<filterData.length;i++){
        str = str + `and ${filterData[i][0].toLowerCase()} eq \'${filterData[i][1]}\'`
      }
    }
    data['filter'] = str;
  }
    
    this.setState({isLoading : true},()=>{
      postAjaxCall(api,data,(data,error)=>{
        if(error==null){
          this.setState({rowData:data,isLoading:false,dashboardFlag:true},()=>{
            this.getDetails()
          })
        }
        else{
        this.setState({isLoading : false},()=>{
          console.log(error)
        })
        }
      })
    })
}

columnUpdate(data){
  this.setColumnDefs([data])
  // let {columnDefs} = this.state;
  // let updatedColumnDefs = columnDefs
  // let newColumn = {
  //   headerName: "java",
  //   field: "java"
    
  // }
  // updatedColumnDefs.push(newColumn)
  // this.setState({columnDefs : updatedColumnDefs})
}

getDetails(){
  let {rowData} = this.state;
  if(isNotEmpty(rowData)){
    if(isNotEmpty(rowData.value)){
      let data = rowData.value.map((data)=>{
        return {
          name : `${data.candidate_first_name} ${data.candidate_last_name}`,
          email : data.email,
          mobile : data.mobile,
          skills : data.keyskills,
          candidateId : data.candidate_id,
          designation : data.designation,
          companyName : data.company_name,
          chatbotStatus : data.chatbot_status,
          source : data.source,
          recruiter : data.recruiter,
          parsingResponse : data.parsing_response_text,
          ResumeLink : data.resumelink,
        }
      })
      this.setState({rowDefs : data,
                    candidateCount : rowData['@odata.count'],
                    domain  : rowData['@search.facets'].domain,  
                    role  : rowData['@search.facets'].role,
                    stage  : rowData['@search.facets'].stage_name,
                    recruiter  : rowData['@search.facets'].recruiter}
                    )
    }
  }
}

handleFilterChange(depart,data){
  let updatedData = [depart,data]
  let {filterData} = this.state;
  if(!(filterData.includes(updatedData))){
    filterData.push(updatedData)
  }
  this.setState({filterData : filterData},()=>{
    this.handleSubmit('filter')
  })
}

removeFilterChange(data){
  let {filterData} = this.state;
  if((filterData.includes(data))){
    filterData=filterData.filter((item)=>{
      return item!==data
    })
  }
  this.setState({filterData : filterData},()=>{
    this.handleSubmit('filter')
  })
}

handlekeys(data){
  this.setState({disabledInput : true},()=>{
    if(data.value === 'Key Skills'){
      this.setState({keyForSkills : "keyskills"},()=>{
        this.setState({disabledInput : false})
      })
    }else{
      this.setState({keyForSkills : "parsing_response_text"},()=>{
        this.setState({disabledInput : false})
      })
    }
  })
}

render(){
  const {
    columnDefs,
      rowDefs,
      domain,
      role,
      stage,
      recruiter,
      filterData,
      candidateCount,
      isLoading,
      disabledInput,
      dashboardFlag,
  } = this.state;

  return(
    <div>
      {
        isLoading &&
        <Loader />
      }
      <Header
        handleSearchData={this.handleSearchData}
        handleSubmit={this.handleSubmit}
        handlekeys={this.handlekeys}
        disabledInput={disabledInput}
      />
      {
      dashboardFlag &&
      <div className="container-xl" style={{ maxWidth: '1285px' }}>
        <div className="row" style={{ height: "45px" }}>
          <div className="col-lg-2 row">
            <h5 className="search-count">Candidates</h5>
            <div className="candidate-count-circle">{candidateCount}</div>
          </div>
          <div className="col-lg-10" style={{padding:"10px 0 0 60px"}}>
            {
              filterData.map((data,index)=>{
                return(
                  <span className="filter-search mb-1 mr-1"
                        style={{cursor:'pointer'}}
                        key = {index}
                        >
                  {data[1]}
                  <img src={cross} className="ml-2" onClick={() => this.removeFilterChange(data)}/>
                  </span>
                  )
              })
            }
          </div>
        </div>
        <div className="row">
          <div className="col-lg-2 search-box">
            <FilterWorkspace
              data={domain}
              header={"Domain"}
              handleFilterChange = {this.handleFilterChange}
            />
            <FilterWorkspace
              data={role}
              header={"Role"}
              handleFilterChange = {this.handleFilterChange}
            />
            <FilterWorkspace
              data={stage}
              header={"Stage"}
              handleFilterChange = {this.handleFilterChange}
            />
            <FilterWorkspace
              data={recruiter}
              header={"Recruiter"}
              handleFilterChange = {this.handleFilterChange}
            />
          </div>
          <div className="col-lg-10">
            <Workspace
              header={columnDefs}
              rowDefs={rowDefs}
              columnDefs={columnDefs}
            />
          </div>
        </div>
      </div>
      }
    </div>
  )
}
}

export default SearchWorkspace;