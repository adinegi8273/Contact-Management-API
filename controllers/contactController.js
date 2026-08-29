import * as ContactModel from "../models/contactModel.js";

export async function getContacts(req, res) {
    try {
        const { sortBy, order, page, limit, search } = req.query;
        const result = await ContactModel.getAllContacts({ sortBy, order, page, limit, search });
        res.status(200).json({ data: result.rows, pagination: result.pagination });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch contacts" });
    }
}

export async function getContact(req, res) {
    try {
        const contact = await ContactModel.getContactById(req.params.id);
        if (!contact) {
            return res.status(404).json({ error: "Contact not found" });
        }
        res.status(200).json({ data: contact });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch contact" });
    }
}

export async function createContact(req, res) {
    try {
        const existing = await ContactModel.findDuplicate(req.body);
        if (existing) {
            return res.status(409).json({
                error: "A contact with this email or phone number already exists"
            });
        }

        const contact = await ContactModel.createContact(req.body);
        res.status(201).json({ data: contact, message: "Contact created successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create contact" });
    }
}

export async function updateContact(req, res) {
    try {
        const id = req.params.id;
        const current = await ContactModel.getContactById(id);
        if (!current) {
            return res.status(404).json({ error: "Contact not found" });
        }

        const duplicate = await ContactModel.findDuplicate(req.body, id);
        if (duplicate) {
            return res.status(409).json({
                error: "Another contact with this email or phone number already exists"
            });
        }

        const updated = await ContactModel.updateContact(id, req.body);
        res.status(200).json({ data: updated, message: "Contact updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update contact" });
    }
}

export async function deleteContact(req, res) {
    try {
        const deleted = await ContactModel.deleteContact(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: "Contact not found" });
        }
        res.status(200).json({ data: deleted, message: "Contact deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete contact" });
    }
}
