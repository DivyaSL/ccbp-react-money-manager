// Write your code here
import './index.css'

const TransactionItem = props => {
  const {
    transactionDetails,
    transactionTypeOptions,
    onDeleteTransaction,
  } = props

  const {id, title, amount, activeTypeId} = transactionDetails

  const type = transactionTypeOptions.find(
    eachType => eachType.optionId === activeTypeId,
  )

  const onClickDelete = () => {
    onDeleteTransaction(id, amount, activeTypeId)
  }

  return (
    <li className="table-row">
      <p className="table-cell">{title}</p>
      <p className="table-cell">{amount}</p>
      <p className="table-cell">{type.displayText}</p>
      <button
        onClick={onClickDelete}
        type="button"
        className="delete-cell"
        data-testid="delete"
      >
        <img
          className="delete-icon"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default TransactionItem
