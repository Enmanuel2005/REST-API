const express = require('express');
const { db } = require("./firebase/db");
const { v4: uuidv4 } = require('uuid');
const app = express();

app.use(express.json());
app.use(express.urlencoded());

const port = process.env.PORT || 3000;
const contactTable = db.ref('contacts');

const writeContactData = async (name, lastName, numberPhone) => {
    const userId = uuidv4();
    const contactRef = contactTable.child(userId);

    await contactRef.set({
        name: name,
        lastName: lastName,
        phone: numberPhone
    });

    return userId;
}

app.get("/contacts", async (req, res) => {
    const contactAbsoluteValues = await contactTable.once('value');
    const contacts = contactAbsoluteValues.val();

    const changedContacts = Object.keys(contacts).map(key => {
        return {
            name: contacts[key].name,
            lastName: contacts[key].lastName,
            phone: contacts[key].phone
        };
    });

    res.json(changedContacts);
});

app.post("/contacts", async (req, res) => {
    await writeContactData(req.body.name, req.body.lastName, req.body.phone);
    console.log(req.body);
    res.json({ message: 'Result' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
