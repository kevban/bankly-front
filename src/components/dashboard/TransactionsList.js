import React, { useCallback, useEffect, useState } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import BanklyApi from '../../BanklyAPI';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Chip, Drawer, Pagination, Stack } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import CheckIcon from '@mui/icons-material/Check';
import moment from 'moment';
import { clearPlaidLink, storeUser } from '../../actions/actionCreators';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { updateTransactions as updateTransactionsAction } from '../../actions/actionCreators';
import usePagination from '../../hooks/usePagination';
import getIcon from '../../helpers/icons'
import CategoryIcon from '../addTransactionPage/CategoryIcon';
import AddTransactionPage from '../addTransactionPage/AddTransactionPage';
import { showEditTransactionDrawer } from '../../actions/actionCreators';
import { v4 as uuid } from 'uuid'
import { formatNum } from '../../helpers/formatNum';
import useMediaQuery from '@mui/material/useMediaQuery';
import _ from 'lodash';
import { usePlaidLink } from 'react-plaid-link';
import ReconnectDialog from './ReconnectDialog';
import { Box } from '@mui/system';



function TransactionsList({ maxPageLength }) {
  const user = useSelector(store => store.auth.user)
  const updateLink = useSelector(store => store.plaid.updateLink)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const midScreen = useMediaQuery(
    '(max-width:1200px)'
  )

  const smScreen = useMediaQuery(
    '(max-width:800px)'
  )
  const updateTransactions = async () => {
    setButtonState(1)
    await dispatch(updateTransactionsAction())
    setButtonState(2)
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
        <Title>Recent Transactions</Title>
        <div>
          {
            refreshButton(refreshButtonState)
          }
        </div>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              {midScreen ? null : <TableCell>Tag</TableCell>}
              {smScreen ? null : <TableCell><Box width={100}>Account</Box></TableCell>}

              <TableCell align="right">Amount</TableCell>
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
                <TableCell><CategoryIcon category={row.bankly_category} handleClick={() => { }}></CategoryIcon></TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>
                  {row.name}
                </TableCell>
                {midScreen ? null : <TableCell><Stack direction={'row'} spacing={1}>
                  {row.category.map((category, idx) => (
                    <Chip key={uuid()} label={category} variant="outlined" />
                  ))}
                </Stack></TableCell>}
                {smScreen ? null : <TableCell
                  style={{
                    width: 1,
                    whiteSpace: "normal",
                    wordWrap: "break-word"
                  }}><Box width={100}>{row.account_name}</Box></TableCell>}

                <TableCell align="right">{`${formatNum(row.amount, true)}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination count={Math.ceil(user.transactions.length / maxPageLength)} sx={{ mx: 'auto', mt: '10px' }} onChange={handlePagination}></Pagination>
    </React.Fragment>
  );
}



export default TransactionsList