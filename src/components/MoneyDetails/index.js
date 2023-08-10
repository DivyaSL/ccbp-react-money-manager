// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {balance, income, expenses} = props

  return (
    <>
      <div className="balance-bg details-container">
        <div className="img-container">
          <img
            className="image"
            src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
            alt="balance"
          />
        </div>
        <div className="details">
          <p className="details-description">Your Balance</p>
          <p data-testid="balanceAmount" className="amount">
            Rs {balance}
          </p>
        </div>
      </div>
      <div className="income-bg details-container">
        <div className="img-container">
          <img
            className="image"
            src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
            alt="income"
          />
        </div>
        <div className="details">
          <p className="details-description">Your Income</p>
          <p data-testid="incomeAmount" className="amount">
            Rs {income}
          </p>
        </div>
      </div>
      <div className="expenses-bg details-container">
        <div className="img-container">
          <img
            className="image"
            src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
            alt="expenses"
          />
        </div>
        <div className="details">
          <p className="details-description">Your Expenses</p>
          <p data-testid="expensesAmount" className="amount">
            Rs {expenses}
          </p>
        </div>
      </div>
    </>
  )
}
export default MoneyDetails
