import Bridge from '../../images/IMG_9358.jpeg'

const Styles = theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  root: {
    flexGrow: 1,
    padding: 0
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  harbor: {
    backgroundImage: `url(${Bridge})`,
    backgroundSize: 'cover',
    height: '120vh'
  },
  title: {
    fontFamily: 'Shadows Into Light',
    color: '#3d405b'
  }
})

export default Styles
