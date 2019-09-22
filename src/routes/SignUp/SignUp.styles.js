const Styles = theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250
  },
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  title: {
    fontFamily: 'Shadows Into Light',
    color: '#3d405b',
    fontSize: '3em'
  }
})

export default Styles
