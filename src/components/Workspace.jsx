import React from 'react';
import {AgGridReact} from "ag-grid-react";
import {LicenseManager} from "ag-grid-enterprise";
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css'

LicenseManager.setLicenseKey("Hexagon_Executive_Search_Pvt._Ltd._Rockethire.io_1Devs24_August_2019__MTU2NjYwMTIwMDAwMA==7a2d65390aed31c7278af1fe7e1c1af3");

class Workspace extends React.Component{
    render(){
        return(
            <div className="row m-0" style = {{width: '100%'}}>
                {
                    this.props.rowDefs &&
                    <div className="ag-theme-balham"
                         style={{
                            //  fontFamily: 'Roboto',
                             fontSize: '14px',
                             width: '100%',
                             height: '85vh',
                             border: '1px solid #d5d5d5',
                             color: '#74818d',
                             borderRadius: '5px'
                         }}>
                        <AgGridReact
                            excelStyles                 =   {this.props.excelStyle || null}
                            onFilterChanged             =   {this.props.filterChanged || null}
                            onGridReady                 =   {this.props.onGridReady || null}
                            pagination                  =   {this.props.pagination || true}
                            rowSelection                =   {"multiple"}
                            rowDeselection              =   {true}
                            onCellValueChanged          =   {this.props.cellValueChanged || null}
                            paginationPageSize          =   {this.props.paginationPageSize || 100}
                            frameworkComponents         =   {this.props.frameworkComponents || null}
                            columnDefs                  =   {this.props.header || null}
                            defaultColDef               =   {this.props.defaultColDef || null}
                            onRowSelected               =   {this.props.onRowSelected || null}
                            rowHeight                   =   {30}
                            headerHeight                =   {30}
                            suppressRowClickSelection   =   {this.props.suppressRowClickSelection || false}
                            rowData                     =   {this.props.rowDefs || []}
                            sortable                    =    {true}
                            filter                      =    {true}
                            resizable                   =    {true}
                            sideBar                     =    {this.props.toolPanel}
                            enableBrowserTooltips       =    {true}
                            loadingOverlayComponent     =    {this.props.loadingOverlayComponent||{}}
                        />
                    </div>
                }
            </div>
        )
            
        }
}

export default Workspace;