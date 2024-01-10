interface ErrorProps {
  errorMessage: string;
}

const Error = (props: ErrorProps) => {
  const { errorMessage } = props

  return errorMessage === '' ? null : 
    (
      <div>
        <h3 style={{color: 'red'}}>{errorMessage}</h3>
      </div>
    )
}

export default Error