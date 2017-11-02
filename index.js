let store = {customers: [], meals: [], deliveries: [], employers: []}

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
    return [].concat.apply([], allDeliveries);
  }

  meals(){
    let allMeals = this.employees().map((customer) => {
      return customer.meals()
    })
    return [].concat.apply([], allMeals);
  }
}

let customerId = 0;

class Customer {

  constructor(name, employer={}){
    this.name =  name;
    this.id = ++customerId;
    this.employerId = employer.id;

    store.customers.push(this);
  }

  meals(){
    return this.deliveries().map((delivery) => {
      return delivery.meal();
    })
  }

  deliveries(){
    return store.deliveries.filter((delivery) => {
      return delivery.customerId === this.id;
    })
  }

  totalSpent(){}
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
    return this.deliveries().map((delivery) => {
      return delivery.customer();
    })
  }

  byPrice(){}
}

let deliveryId = 0;

class Delivery {

  constructor(meal, customer){
    this.mealId = meal.id;
    this.customerId = customer.id;
    this.id = ++deliveryId;

    store.deliveries.push(this);
  }

  meal(){
    return store.meals.find(function(meal){
      return meal.id === this.mealId;
    }.bind(this))
  }

  customer(){
    return store.customers.find(function(customer){
      return customer.id === this.customerId;
    }.bind(this))
  }
}
