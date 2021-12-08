export const ACCOUNTS_SCREEN_MESSAGE = {
  saved_accounts: 'You currently have {} accounts saved. What you want to do next?',
  unsaved_accounts: 'I can see that you didn\'t added any accounts yet. Please add some accounts before you do any operation'
};

export const ERROR_MESSAGES = {
  required: 'This field is required',
  invalidAccount: 'You need to pick an account from the list',
  differentAccount: 'Credit account and debit account should not be the same'
};

export const MOCK_RULES = [
  {
    id: 1,
    debitAccount: '1011',
    creditAccount: '1012',
    description: 'Registering acquired goods from the supplier'
  },
  {
    id: 2,
    debitAccount: '1011',
    creditAccount: '1016',
    description: 'Registering alimentary goods from a local business. Goods needs to be eco'
  },
  {
    id: 3,
    debitAccount: '1011',
    creditAccount: '1044',
    description: 'Registering material goods from a charity organisation. The materials value should be under 100.000$'
  },
  {
    id: 4,
    debitAccount: '1044',
    creditAccount: '1012',
    description: 'Moving goods from alimentary department to the IT department'
  },
  {
    id: 5,
    debitAccount: '1044',
    creditAccount: '1011',
    description: 'For taxes purposes'
  },
  {
    id: 6,
    debitAccount: '121',
    creditAccount: '131',
    description: 'Money loan to one of the entities registered in the business'
  },
  {
    id: 7,
    debitAccount: '133',
    creditAccount: '131',
    description: 'To pay for the consumables from production '
  },
  {
    id: 8,
    debitAccount: '1511',
    creditAccount: '1512',
    description: 'Payment of annual interest on loans for production machinery'
  },
  {
    id: 9,
    debitAccount: '1511',
    creditAccount: '1516',
    description: 'Donations to charitiesr'
  },
  {
    id: 10,
    debitAccount: '1614',
    creditAccount: '1617',
    description: 'Improving anti-pollution systems'
  },
  {
    id: 11,
    debitAccount: '1682',
    creditAccount: '1685',
    description: 'Registering acquired gods from the supplier'
  }
];
