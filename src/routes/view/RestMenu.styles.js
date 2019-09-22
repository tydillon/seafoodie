const Styles = theme => ({
  root: {
    flexGrow: 1
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  menubar: {
    margin: '20px 0px 20px 0px'
  },
  menucont: {
    width: '100vw',
    display: 'flex',
    flex: 'row wrap',
    justifyContent: 'space-around'
  },
  searchbar: {
    width: '250px',
    marginTop: '25px',
    marginRight: '25px'
  }
})

export default Styles
