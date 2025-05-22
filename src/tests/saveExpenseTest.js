// This is a test script you can run in the browser console to check the expense saving functionality
const testSaveExpense = async () => {
  try {
    // Get the current expense form state
    const state = store.getState();
    const user = state.user;
    const expense = state.expenseManagement.expense;
    
    console.log("Current expense state:", expense);
    
    // Create a test expense based on the current state
    const testExpense = {
      ...expense,
      description: "Test expense " + new Date().toISOString(),
      amount: 100,
      category: "Test Category",
      dates: {
        ...expense.dates,
        expenseDate: Date.now()
      }
    };
    
    console.log("Test expense to save:", testExpense);
    
    // Mock loading state handler
    const setLoading = (state) => {
      console.log("Loading state:", state);
    };
    
    // Call the add expense function directly
    const result = await fbAddExpense(user, setLoading, testExpense, []);
    
    console.log("Save result:", result);
    return result;
  } catch (error) {
    console.error("Test save failed:", error);
    return false;
  }
};

// Run the test
testSaveExpense().then(result => {
  console.log("Test completed with result:", result);
});
