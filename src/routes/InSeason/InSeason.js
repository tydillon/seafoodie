import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import './InSeason.styles.js'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper
} from '@material-ui/core'
import Styles from './InSeason.styles'

const useStyles = makeStyles(Styles)

const InSeason = () => {
  const classes = useStyles()
  // want to add in some kind of logic that
  // highlights a column based on the current month

  // const month = new Date().getMonth()

  function createData(name, spring, summer, fall, winter) {
    return { name, spring, summer, fall, winter }
  }

  const rows = [
    createData('Amberjack', 'X', 'X', 'X', 'X'),
    createData('Black Sea Bass', 'X', 'X', 'X', 'X'),
    createData('Blue Crab', 'X', 'X', 'X', 'X'),
    createData('Clams', 'X', 'X', 'X', 'X'),
    createData('Grouper/Tilefish', 'X', 'X', 'X', 'X'),
    createData('Hogfish', 'X', 'X', 'X', 'X'),
    createData('King and Spanish Mackerel', 'X', 'X', 'X', 'X'),
    createData('Lionfish', 'X', 'X', 'X', 'X'),
    createData('Mahi Mahi', 'X', 'X', 'X', ' '),
    createData('Oyster Clusters', 'X', ' ', 'X', 'X'),
    createData('Oyster Singles', 'X', 'X', 'X', 'X'),
    createData('Red Porgy', 'X', 'X', 'X', ' '),
    createData('Shad', 'X', ' ', ' ', 'X'),
    createData('Shrimp', 'X', 'X', 'X', ' '),
    createData('Striped Sea Bass', 'X', 'X', 'X', 'X'),
    createData('Swordfish', 'X', 'X', 'X', 'X'),
    createData('Triggerfish', 'X', 'X', 'X', 'X'),
    createData('Vermilion Snapper', 'X', 'X', 'X', 'X'),
    createData('Wahoo', ' ', 'X', 'X', 'X'),
    createData('Wreckfish', 'X', 'X', 'X', ' ')
  ]

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.root}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Fish</TableCell>
              <TableCell align='center'>Spring</TableCell>
              <TableCell align='center'>Summer</TableCell>
              <TableCell align='center'>Fall</TableCell>
              <TableCell align='center'>Winter</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => {
              return (
                <TableRow key={row.name}>
                  <TableCell component='th' scope='row' align='center'>
                    {row.name}
                  </TableCell>
                  <TableCell align='center' className='spring'>
                    {row.spring}
                  </TableCell>
                  <TableCell align='center' className='summer'>
                    {row.summer}
                  </TableCell>
                  <TableCell align='center' className='fall'>
                    {row.fall}
                  </TableCell>
                  <TableCell align='center' className='winter'>
                    {row.winter}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Paper>
    </div>
  )
}

export default InSeason
