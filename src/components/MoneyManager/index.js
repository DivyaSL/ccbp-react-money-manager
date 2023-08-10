import {Component} from 'react'
import './index.css'
import {v4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    balance: 0,
    income: 0,
    expenses: 0,
    transactionList: [],
    activeTypeId: 'INCOME',
    title: '',
    amount: '',
  }

  onTitleChange = event => this.setState({title: event.target.value})

  onAmountChange = event => this.setState({amount: event.target.value})

  onTypeChange = event => this.setState({activeTypeId: event.target.value})

  addTransaction = event => {
    event.preventDefault()

    const {title, amount, activeTypeId} = this.state
    const newTransaction = {
      id: v4(),
      title,
      amount,
      activeTypeId,
    }

    this.setState(prevState => ({
      transactionList: [...prevState.transactionList, newTransaction],
      title: '',
      amount: '',
      activeTypeId: 'INCOME',
    }))

    const numericAmount = parseInt(amount)
    if (activeTypeId === 'INCOME') {
      this.setState(prevState => ({
        balance: prevState.balance + numericAmount,
        income: prevState.income + numericAmount,
        expenses: prevState.expenses,
      }))
    } else {
      this.setState(prevState => ({
        balance: prevState.balance - numericAmount,
        income: prevState.income,
        expenses: prevState.expenses + numericAmount,
      }))
    }
  }

  onDeleteTransaction = (id, deletedAmount, deletedActiveId) => {
    const {transactionList} = this.state
    const filteredList = transactionList.filter(
      eachTransaction => eachTransaction.id !== id,
    )
    if (deletedActiveId === 'INCOME') {
      this.setState(prevState => ({
        balance: parseInt(prevState.balance) - parseInt(deletedAmount),
        income: parseInt(prevState.income) - parseInt(deletedAmount),
        transactionList: filteredList,
      }))
    } else {
      this.setState(prevState => ({
        balance: parseInt(prevState.balance) + parseInt(deletedAmount),
        expenses: parseInt(prevState.expenses) - parseInt(deletedAmount),
        transactionList: filteredList,
      }))
    }
  }

  render() {
    const {
      balance,
      income,
      expenses,
      transactionList,
      activeTypeId,
      title,
      amount,
    } = this.state
    return (
      <div className="bg">
        <div className="app-container">
          <div className="header-container">
            <h1 className="header-heading">Hello, Richard</h1>
            <p className="header-description">
              Welcome back to your
              <span className="header-description-span"> Money Manager</span>
            </p>
          </div>
          <div className="money-details-container">
            <MoneyDetails
              balance={balance}
              income={income}
              expenses={expenses}
            />
          </div>
          <div className="transaction-section">
            <form
              className="add-transaction-form"
              onSubmit={this.addTransaction}
            >
              <h1 className="form-heading">Add Transaction</h1>
              <label className="input-label" htmlFor="title">
                TITLE
              </label>
              <input
                className="input-box"
                type="text"
                onChange={this.onTitleChange}
                id="title"
                placeholder="TITLE"
                value={title}
              />
              <label className="input-label" htmlFor="amount">
                AMOUNT
              </label>
              <input
                className="input-box"
                type="text"
                onChange={this.onAmountChange}
                id="amount"
                placeholder="AMOUNT"
                value={amount}
              />
              <label className="input-label" htmlFor="type">
                TYPE
              </label>
              <select
                onChange={this.onTypeChange}
                value={activeTypeId}
                className="input-box"
                id="type"
              >
                {transactionTypeOptions.map(eachTransactionType => (
                  <option
                    value={eachTransactionType.optionId}
                    key={eachTransactionType.optionId}
                  >
                    {eachTransactionType.displayText}
                  </option>
                ))}
              </select>
              <button className="add-transaction-btn" type="submit">
                Add
              </button>
            </form>
            <ul className="transaction-history-table">
              <h1 className="table-heading">History</h1>
              <li className="table-row">
                <p className="table-header-cell">Title</p>
                <p className="table-header-cell">Amount</p>
                <p className="table-header-cell">Type</p>
              </li>
              {transactionList.map(eachItem => (
                <TransactionItem
                  transactionDetails={eachItem}
                  key={eachItem.id}
                  transactionTypeOptions={transactionTypeOptions}
                  onDeleteTransaction={this.onDeleteTransaction}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
