const Accounts = require("../../models/Account");

exports.accountCreate = async (req, res) => {
  try {
    const newAccount = await Accounts.create(req.body);
    res.status(201).json(newAccount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.accountDelete = async (req, res) => {
  const { accountId } = req.params;
  try {
    const foundAccount = await Accounts.findById(accountId);

    if (foundAccount) {
      await foundAccount.deleteOne();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Account not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.accountUpdate = async (req, res) => {
  const { accountId } = req.params;

  try {
    const foundAccount = await Accounts.findById(accountId);

    if (foundAccount) {
      await foundAccount.updateOne(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Account not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.accountsGet = async (req, res) => {
  try {
    const accounts = await Accounts.find({}, "-createdAt -updatedAt");
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAccountByUsername = async (req, res) => {
  const { username } = req.params;

  try {
    const foundAccount = await Account.findOne({ username });

    if (!foundAccount) {
      return res.status(404).json({ message: "Account not found" });
    }

    if (req.query.currency === "usd") {
      const accountInUsd = {
        ...foundAccount.toObject(),
        funds: foundAccount.funds * 3.31,
      };
      return res.status(200).json(accountInUsd);
    }

    res.status(200).json(foundAccount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
