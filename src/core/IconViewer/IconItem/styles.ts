export const styles = {
  root: {
    display: 'flex',
    '& .MuiTypography-h1': {
      maxWidth: '90%',
      textAlign: 'center',
      alignSelf: 'center',
    },
    '& .MuiDialog-paper': {
      borderRadius: '16px',
      maxHeight: '100%',
    },
    '& .MuiPaper-root': {
      background: '#16132D',
      padding: '30px 40px 40px',
      position: 'relative',
      overflow: 'initial',
      maxWidth: '960px',
    },
  },

  preview: {
    m: 2,
    width: '1em',
    height: '1em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: '0',
    fontSize: '150px',
    marginTop: '16px',
    color: 'rgba(0, 0, 0, 0.87)',
    backgroundSize: '30px 30px',
    backgroundColor: 'transparent',
    backgroundPosition: '0px 0px, 0px 15px, 15px -15px, -15px 0px',
    backgroundImage:
      'linear-gradient(45deg, rgb(230, 230, 230) 25%, transparent 25%), linear-gradient(-45deg, rgb(230, 230, 230) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgb(230, 230, 230) 75%), linear-gradient(-45deg, transparent 75%, rgb(230, 230, 230) 75%)',
  },
};
