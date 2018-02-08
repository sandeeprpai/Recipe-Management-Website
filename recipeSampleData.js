db = db.getSiblingDB('recipeSample')
db.createCollection('recipes')
recipesCollection = db.getCollection("recipes")
recipesCollection.remove({})
recipesCollection.insert(
{
	  recipeID: 1,
	  recipeName: "Veggie Delight Sandwich",
	  recipeOwner: "Jasbir",
	  recipeInstructions: "xyz...",
	  recipeCategory: "Burgers & Sandwiches",
	  recipeRating: 3,
	  majorIngredient: "Bread, cucumber, olives, jalapenos, mozerella",
	  calories: 200
}
)
recipesCollection.insert(
{
	  recipeID: 2,
	  recipeName: "Chicken Burger",
	  recipeOwner: "Jingyi",
	  recipeInstructions: "xyz...",
	  recipeCategory: "Burgers & Sandwiches",
	  recipeRating: 4,
	  majorIngredient: "chicken, Bread, mozerella",
	  calories: 200
}
)
recipesCollection.insert(
{
	  recipeID: 3,
	  recipeName: "Vegetable Roll",
	  recipeOwner: "Sandeep",
	  recipeInstructions: "xyz...",
	  recipeCategory: "Burgers & Sandwiches",
	  recipeRating: 2,
	  majorIngredient: "tomato, onion, cucumber, beans, tortilla",
	  calories: 200
}
)
recipesCollection.insert(
{
	  recipeID: 4,
	  recipeName: "Raspberry and Blueberry Cobbler",
	  recipeOwner: "Jingyi",
	  recipeInstructions: "Mix flour, 1/2 cup sugar, baking powder, and salt in a bowl; mash butter into the flour mixture until crumbly. Stir boiling water into the flour mixture to form a dough...",
	  recipeCategory: "Cakes & Desserts",
	  recipeRating: 2,
	  majorIngredient: "Baking Powder, Blueberries, Raspberries",
	  calories: 200
}
)
recipesCollection.insert(
{
	  recipeID: 5,
	  recipeName: "Peach Pie with Sour Cream",
	  recipeOwner: "Sandeep",
	  recipeInstructions: "Preheat oven to 425 degrees F (220 degrees C). Butter a 9-inch pie dish.",
	  recipeCategory: "Cakes & Desserts",
	  recipeRating: 4,
	  majorIngredient: "Peach, Sour cream, Sugar, All purpose flour",
	  calories: 500
}
)
recipesCollection.insert(
{
	  recipeID: 6,
	  recipeName: "Orange Meringue Pie",
	  recipeOwner: "Jasbir",
	  recipeInstructions: "Preheat oven to 400 degrees F (205 degrees C). Line pastry with aluminum foil and a layer of pie weights or dried beans. Bake in the preheated oven until edge of crust is golden, about 10 minutes. Carefully remove the foil and weights; bake about 5 minutes more.",
	  recipeCategory: "Cakes & Desserts",
	  recipeRating: 4,
	  majorIngredient: "Egg, Sugar, Orange Zest, Corn starch, Lime",
	  calories: 500
}
)
recipesCollection.insert(
{
	  recipeID: 7,
	  recipeName: "Too Much Chocolate Cake ",
	  recipeOwner: "Jasbir",
	  recipeInstructions: "Preheat oven to 350 degrees F (175 degrees C). In a large bowl, mix together the cake and pudding mixes, sour cream, oil, beaten eggs and water. Stir in the chocolate chips and pour batter into a well greased 12 cup bundt pan.",
	  recipeCategory: "Cakes & Desserts",
	  recipeRating: 2,
	  majorIngredient: "Sour Cream, Eggs, Chocolate Chips, Sour Cream",
	  calories: 300
}
)
recipesCollection.insert(
{
          recipeID: 16,
          recipeName: "Canal House's Chicken Thighs with Lemon",
          recipeOwner: "Jingyi",
          recipeInstructions: "xyz...",
          recipeCategory: "Entrees",
          recipeRating: 3,
          majorIngredient: "Bread, cucumber, olives, chicken thighs, lemon",
          calories: 400
}
)
recipesCollection.insert(
{
          recipeID: 8,
          recipeName: "Crispy Sesame Baked Tofu & Shiitake Mushrooms",
          recipeOwner: "Jasbir",
          recipeInstructions: "xyz...",
          recipeCategory: "Entrees",
          recipeRating: 4,
          majorIngredient: "sesame oil, olives, extra-firm tofu",
          calories: 200
}
)
recipesCollection.insert(
{
          recipeID: 9,
          recipeName: "Two-Pan Pasta with Spinach, Walnuts and Lemon",
          recipeOwner: "Sandeep",
          recipeInstructions: "xyz...",
          recipeCategory: "Entrees",
          recipeRating: 4,
          majorIngredient: "pasta, spinach, walnuts, lemon",
          calories: 300
}
)


recipesCollection.insert(
{
          recipeID: 10,
          recipeName: "Super Berry Quinoa Salad",
          recipeOwner: "Jasbir",
          recipeInstructions: "xyz...",
          recipeCategory: "Soups & Salads",
          recipeRating: 3,
          majorIngredient: "quinoa, flaxseed, mixed baby green, mixed fresh berries,olive oil",
          calories: 200
}
)
recipesCollection.insert(
{
          recipeID: 11,
          recipeName: "Mixed Vegetable Salad Platter",
          recipeOwner: "Jingyi",
          recipeInstructions: "xyz...",
          recipeCategory: "Soups & Salads",
          recipeRating: 2,
          majorIngredient: "zucchini, carrot, olive oil, lemon",
          calories: 200
}
)
recipesCollection.insert(
{
          recipeID: 12,
          recipeName: "Spicy Butternut Squash Soup",
          recipeOwner: "Sandeep",
          recipeInstructions: "xyz...",
          recipeCategory: "Soups & Salads",
          recipeRating: 4,
          majorIngredient: "butternut, oil, onion, chilli, broth",
          calories: 200
}
)


recipesCollection.insert(
{
          recipeID: 13,
          recipeName: "Pepperoni Pizza Pasta",
          recipeOwner: "Jingyi",
          recipeInstructions: "xyz...",
          recipeCategory: "Pizzas & Pastas",
          recipeRating: 3,
          majorIngredient: "ziti, pizza sauce, pepper, cheese",
          calories: 400
}
)
recipesCollection.insert(
{
          recipeID: 14,
          recipeName: "Pear and Gorgonzola Cheese Pizza",
          recipeOwner: "Jasbir",
          recipeInstructions: "xyz...",
          recipeCategory: "Pizzas & Pastas",
          recipeRating: 4,
          majorIngredient: "pizza curst, cheese, pear",
          calories: 200
}
)
recipesCollection.insert(
{
          recipeID: 15,
          recipeName: "Spaghetti Cacio e Pepe",
          recipeOwner: "Sandeep",
          recipeInstructions: "xyz...",
          recipeCategory: "Pizzas & Pastas",
          recipeRating: 4,
          majorIngredient: "spaghetti,olive oil, cheese, garlic, lemon",
          calories: 300
}
)

db.createCollection('users')
usersCollection = db.getCollection("users")
usersCollection.remove({})
usersCollection.insert(
{
	firstName: "Jasbir",
    lastName: "kaur",
    userId: 1,
    password: hex_md5('JasbirPassword'),
    premiumMembershipId: null,
    isPremium: false
 }
 )
usersCollection.insert(
{
	firstName: "Jingyi",
    lastName: "Zhang",
    userId: 2,
    password: hex_md5('JingyiPassword'),
    premiumMembershipId: 1,
    isPremium: true
 }
 )
usersCollection.insert(
{
	firstName: "Sandeep",
    lastName: "Raja",
    userId: 3,
    password: hex_md5('SandeepPassword'),
    premiumMembershipId: null,
    isPremium: false
 }
 )