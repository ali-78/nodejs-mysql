const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user
    .createProduct({
      title: title,
      price: price,
      imageUrl: imageUrl,
      description: description,
    })
    .then((result) => {
      console.log("Created product.");
      res.redirect("/products");
    })
    .catch((err) => console.log(err));
  // products.push(product(req.body.title));
};

exports.getProducts = (req, res, next) => {
  req.user.getProducts()
    .then((products) => {
      res.render("admin/product-list", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const proId = req.params.productId;
  req.user.getProducts({where:{id: proId}})
//   Product.findByPk(proId)
    .then((product) => {
      res.render("admin/edit-product", {
        product: product[0],
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: true,
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  const productTitle = req.body.title;
  const productImageUrl = req.body.imageUrl;
  const productPrice = req.body.price;
  const productDescription = req.body.description;
  Product.findByPk(productId)
    .then((product) => {
      product.title = productTitle;
      product.imageUrl = productImageUrl;
      product.price = productPrice;
      product.description = productDescription;
      return product.save();
    })
    .then((result) =>
      res.render("admin/edit-product", {
        product: result.dataValues,
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: true,
      })
    )
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.findByPk(productId)
    .then((product) => {
      return product.destroy();
    })
    .then((result) => {
      console.log("Destroied Product!");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};
