store = {customers: [], meals: [], deliveries: [], employers: []}

let customerId = 0;

class Customer {
  constructor(name, employer){
    this.name = name;
    if (employer){
      this.employerId = employer.id;
    }
    this.id = ++customerId;

    store.customers.push(this);
  }

  meals(){
    return store.deliveries.map((delivery) => {
      return delivery.meal();
    })
  }

  deliveries(){
    return store.deliveries.filter((delivery) => {
      return delivery.customerId === this.id;
    })
  }

  totalSpent(){
    const priceArray = this.meals().map((meal) => {
      if (meal){
        return meal.price;
      }
    }).filter((price) => { return price })
    return priceArray.reduce((a, b) => {
      return a + b;
    })
  }
}

let mealId = 0;

class Meal {
  constructor(title, price){
    this.title = title;
    this.price = price;
    this.id = ++mealId;

    store.meals.push(this);
  }

  deliveries(){
    return store.deliveries.filter((delivery) => {
      return delivery.mealId === this.id;
    })
  }

  customers(){
    return store.deliveries.map((delivery) => {
      return delivery.customer();
    })
  }

  static byPrice(){
    return store.meals.sort((mealOne, mealTwo) => {
      return mealTwo.price - mealOne.price;
    })
  }
}

let deliveryId = 0;

class Delivery {
  constructor(meal, customer){
    if (meal && customer){
      this.mealId = meal.id;
      this.customerId = customer.id;
    }
    this.id = ++deliveryId;

    store.deliveries.push(this);
  }

  meal(){
    return store.meals.find((meal) => {
      return this.mealId === meal.id;
    })
  }

  customer(){
    return store.customers.find((customer) => {
      return this.customerId === customer.id;
    })
  }
}

let employerId = 0;

class Employer {
  constructor(name){
    this.name = name;
    this.id = ++employerId;

    store.employers.push(this);
  }

  employees(){
    return store.customers.filter((customer) => {
      return customer.employerId === this.id;
    })
  }

  deliveries(){
    let allDeliveries = this.employees().map((customer) => {
      return customer.deliveries()
    })

    let deliveryArray = [].concat.apply([], allDeliveries);
    return deliveryArray;
  }

  meals(){
    let allMeals = this.deliveries().map((delivery) => {
      return delivery.meal();
    })

    let mealArray = [...new Set(allMeals)]

    return mealArray;
  }

  mealTotals(){
    
  }
}
