import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Chip, Pagination, Stack } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import CheckIcon from '@mui/icons-material/Check';
import moment from 'moment';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { updateTransactions as updateTransactionsAction } from '../../actions/actionCreators';
import usePagination from '../../hooks/usePagination';
import CategoryIcon from '../addTransactionPage/CategoryIcon';
import { v4 as uuid } from 'uuid'
import { formatNum } from '../../helpers/formatNum';
import useMediaQuery from '@mui/material/useMediaQuery';
import _ from 'lodash';
import { Box } from '@mui/system';



function TransactionsList({ maxPageLength }) {
  const user = useSelector(store => store.auth.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const midScreen = useMediaQuery(
    '(max-width:1300px)'
  )

  const smScreen = useMediaQuery(
    '(max-width:800px)'
  )
  const xsmScreen = useMediaQuery(
    '(max-width:550px)'
  )
  const updateTransactions = async () => {
    setButtonState(1)
    await dispatch(updateTransactionsAction())
    setButtonState(2)
  }

  const cellStyle = {
    px: xsmScreen ? 0 : 3,
    mx: xsmScreen ? 0 : 3
  }

  function compareDate(a, b) {
    if (moment(a.date).isAfter(moment(b.date))) {
      return -1
    } else if (moment(b.date).isAfter(moment(a.date))) {
      return 1
    } else {
      return 0
    }
  }

  function getCellWidth() {
    if (xsmScreen) {
      return 50
    } else if (smScreen) {
      return 150
    } else {
      return 'auto'
    }
  }

  // 0 is refresh, 1 is refreshing, 2 is refreshed
  const [refreshButtonState, setButtonState] = useState(0)

  const refreshButton = (state) => {
    switch (state) {
      case 0:
        return <Button style={{ position: 'absolute', top: 0, right: 0 }} onClick={updateTransactions}>
          <RefreshIcon></RefreshIcon>
        </Button>
      case 1:
        return <Button style={{ position: 'absolute', top: 0, right: 0 }}>
          <CircularProgress size={'1rem'}></CircularProgress>
        </Button>
      default:
        return <Button style={{ position: 'absolute', top: 0, right: 0 }} color='success'>
          <CheckIcon></CheckIcon>
        </Button>
    }
  }



  const [page, handlePagination] = usePagination();

  if (!user) {
    return <></>
  }


  return (
    <React.Fragment>
      <div style={{ position: 'relative' }}>
        <Title>Transactions</Title>
        <div>
          {
            refreshButton(refreshButtonState)
          }
        </div>

        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell sx={cellStyle} align='left'><Box maxWidth={50}></Box></TableCell>
              <TableCell sx={cellStyle}><Box maxWidth={getCellWidth()}>Date</Box></TableCell>
              <TableCell sx={cellStyle}><Box maxWidth={getCellWidth()}>Description</Box></TableCell>
              {midScreen ? null : <TableCell>Tag</TableCell>}
              {smScreen ? null : <TableCell><Box width={100}>Account</Box></TableCell>}
              <TableCell align="right" sx={{ ...cellStyle }}>
                <Box sx={{ maxWidth:getCellWidth()}}>Amount</Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {_.cloneDeep(user.transactions).sort(compareDate).filter((val, idx) => {
              return idx < (page * maxPageLength) && idx >= ((page - 1) * maxPageLength)
            }).map((row) => (
              <TableRow
                key={uuid()}
                onClick={() => {
                  navigate(`/transactions/${row.transaction_id}`)
                }}
                hover>
                <TableCell sx={cellStyle} align='left'>
                  <Box maxWidth={50}>
                    <CategoryIcon 
                    category={row.bankly_category} 
                    handleClick={() => { }}
                    showName={!xsmScreen}
                    ></CategoryIcon>
                  </Box>
                </TableCell>
                <TableCell sx={cellStyle}>
                  <Box maxWidth={getCellWidth()}>{row.date}</Box>
                </TableCell>
                <TableCell
                  style={{
                    ...cellStyle,
                    whiteSpace: "normal",
                    wordWrap: "break-word",
                    textOverflow: 'ellipsis',
                    overflow: 'hidden'
                  }}
                ><Box
                  maxWidth={getCellWidth()}
                  maxHeight={100}
                >{row.name}</Box>
                </TableCell>
                {
                  midScreen ? null : <TableCell
                    sx={cellStyle}
                  ><Stack direction={'row'} spacing={1}>
                      {row.category.map((category, idx) => (
                        <Chip key={uuid()} label={category} variant="outlined" />
                      ))}
                    </Stack></TableCell>
                }
                {
                  smScreen ? null : <TableCell
                    style={{
                      ...cellStyle,
                      whiteSpace: "normal",
                      wordWrap: "break-word"
                    }}><Box width={100}>{row.account_name}</Box></TableCell>
                }

                < TableCell align="right" sx={{ ...cellStyle }}>
                  <Box sx={{ maxWidth: getCellWidth() }}>{`${formatNum(row.amount, true)}`}</Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div >
      <Pagination count={Math.ceil(user.transactions.length / maxPageLength)} sx={{ mx: 'auto', mt: '10px' }} onChange={handlePagination}></Pagination>
    </React.Fragment >
  );
}



export default TransactionsList