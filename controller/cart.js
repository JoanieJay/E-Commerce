const { Cart } = require("../model/Cart");
const Product = require("../model/Product");

// Add Cart
// Routes POST /api/cart
exports.createCart = async (req, res) => {
  const { productId, quantity } = req.body;
  if (!productId || !quantity) {
    return res
      .status(400)
      .json({ success: false, msg: "Please add a productId and quantity" });
  }
  let product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({
      success: false,
      msg: `Product not found with the id of ${productId}`,
    });
  }
  let price = product.price;
  const user = req.user;
  let userCart = await Cart.findOne({ user });
  console.log(userCart);
  const cartItem = { productId, quantity, price };
  if (userCart) {
    const existingProduct = userCart.cartItem.find(
      (item) => item.productId.toString() === productId
    );
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      userCart.cartItem.push(cartItem);
    }
    userCart.total = userCart.cartItem.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    await userCart.save();
  } else {
    userCart = await Cart.create({ user, cartItem, total: quantity });
  }
  return res.status(201).json({ success: true, data: userCart });
};

// Get single Cart
// Routes GET /api/cart
exports.getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user });
  if (!cart) {
    return res.status(404).json({ success: false, msg: "Cart empty" });
  }
  return res.status(200).json({ success: true, data: cart });
};
// Update Cart
// Routes PUT /api/cart/:id
exports.updateCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user });
    // console.log(cart.cartItem);
    const quantity = req.body.myqun;
    // const { myqun } = req.body;
    const cartItems = cart.cartItem;
    const cartItemToBeRemoved = req.params.id;
    const newCartItems = [];
    let total = 0;
    let found = false;
    for (let i = 0; i < cartItems.length; i++) {
      const item = cartItems[i];
      const currentCartItem = item._id.toString();
      if (currentCartItem === cartItemToBeRemoved) {
        console.log("found item to remove");
        const newItem = {
          ...item,
          quantity,
        };
        total += quantity;
        found = true;

        newCartItems.push(newItem);
      } else {
        newCartItems.push(item);
        total += item.quantity;
      }
    }
    if (!found) {
      return res.status(400).json({ success: false, msg: "Item not found" });
    }

    console.log("newCartItems:", newCartItems);
    cart.cartItem = newCartItems;
    cart.total = total;
    await cart.save();
    return res.status(200).json({ success: true, data: cart });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
};
// Clear Cart
// Routes GET /api/cart
exports.clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.user });
    return res.status(200).json({ success: true, msg: "Cart cleared" });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
};

// Delete cart
// Routes DELETE /api/cart/:id
exports.removeCartItem = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user });
    // console.log(cart.cartItem);
    const cartItems = cart.cartItem;
    const cartItemToBeRemoved = req.params.id;
    const newCartItems = [];
    let total = 0;
    for (let i = 0; i < cartItems.length; i++) {
      const item = cartItems[i];
      const currentCartItem = item._id.toString();
      if (currentCartItem === cartItemToBeRemoved) {
        console.log("found item to remove");
      } else {
        newCartItems.push(item);
        total += item.quantity;
      }
    }
    if (newCartItems.length === cartItems.length) {
      return res.status(400).json({ success: false, msg: "Item not found" });
    }

    console.log("newCartItems:", newCartItems);
    cart.cartItem = newCartItems;
    cart.total = total;
    await cart.save();
    return res.status(200).json({ success: true, data: cart });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
};
