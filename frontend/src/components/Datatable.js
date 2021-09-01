/* Author: Vishal Sancheti */

import React from 'react';
import {useGlobalFilter, usePagination, useSortBy, useTable} from "react-table";
import {Col, Form, Row, Table} from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import {CSVLink} from "react-csv";

const Datatable = (props) => {
    //Init
    const columns = props.columns;
    const data = props.data;
    const allowCSV = props.allowCSV == "false" ? false : true;
    const allowSearch = props.allowSearch == "false" ? false : true;
    const tableInstance = useTable({ columns, data, initialState: { pageSize: 5 } },
        useGlobalFilter,
        useSortBy,
        usePagination);
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        setGlobalFilter,
        page,
        canPreviousPage,
        canNextPage,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageSize, globalFilter }
    } = tableInstance;

    return (
        <div>
            <Row>
                {/*Conditional Display Export CSV Button*/}
                <Col md={{ span: 2 }} className="my-2">
                {allowCSV ?
                    (
                        <CSVLink data={data} filename={"export.csv"} className="secondary-button btn btn-secondary" target="_blank">
                            Export CSV
                        </CSVLink>
                   )
                    : (<></>)
                }
                </Col>

                {/*Conditional Display Search Form*/}
                {allowSearch ?
                    (<Col md={{ span: 2, offset: 8 }}>
                        <Form.Group>
                            <Form.Control type="search" placeholder="Search"
                                          value={globalFilter || ""}
                                          onChange={e => setGlobalFilter(e.target.value)} />
                        </Form.Group>
                    </Col>)
                    : (<></>)
                }
            </Row>

            {/*Table*/}
            <div className="table-responsive">
                <Table bordered striped {...getTableProps()}>
                    <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    <span>{column.isSorted ?
                                        column.isSortedDesc ?
                                            ' 🔽': ' 🔼'
                                        : ''}</span>
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                    </tbody>
                </Table>
            </div>

            {/*Filters and Pagination*/}
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Control as="select" style={{ width: "100px" }}
                                      value={pageSize}
                                      onChange={(e) => {
                                          setPageSize(Number(e.target.value));
                                      }}>
                            {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col>
                    <Pagination className="justify-content-end">
                        <Pagination.First onClick={() => gotoPage(0)} disabled={!canPreviousPage}/>
                        <Pagination.Prev onClick={() => previousPage()} disabled={!canPreviousPage}/>
                        {Array(pageCount).fill().map((v,i) => (
                            <Pagination.Item onClick={() => gotoPage(i)}>{i+1}</Pagination.Item>
                        ))}
                        <Pagination.Next onClick={() => nextPage()} disabled={!canNextPage}/>
                        <Pagination.Last onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}/>
                    </Pagination>
                </Col>
            </Row>

            {/*Table Info*/}
            <Row>
                <Col>
                    <span>Showing {pageSize} results of {rows.length} rows</span>
                </Col>
            </Row>
        </div>
    )
};

export default Datatable;
