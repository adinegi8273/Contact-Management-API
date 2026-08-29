const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\d{7,15}$/;

export function validateContact(req, res, next) {
    const { name, email, phone_number, address, company } = req.body;
    const errors = [];

    if (!name || typeof name !== "string" || name.trim().length < 2) {
        errors.push("name is required and must be at least 2 characters long");
    }

    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
        errors.push("a valid email is required");
    }

    if (!phone_number || typeof phone_number !== "string" || !PHONE_REGEX.test(phone_number.trim())) {
        errors.push("phone_number is required and must be 7-15 digits, numbers only");
    }

    if (address !== undefined && address !== null && typeof address !== "string") {
        errors.push("address must be a string");
    }

    if (company !== undefined && company !== null && typeof company !== "string") {
        errors.push("company must be a string");
    }

    if (errors.length > 0) {
        return res.status(400).json({ error: "Validation failed", details: errors });
    }

    // normalize before it reaches the controller
    req.body.name = name.trim();
    req.body.email = email.trim().toLowerCase();
    req.body.phone_number = phone_number.trim();
    req.body.address = address ? address.trim() : null;
    req.body.company = company ? company.trim() : null;

    next();
}

export function validateIdParam(req, res, next) {
    const id = parseInt(req.params.id);
    if (!id || id <= 0) {
        return res.status(400).json({ error: "Invalid contact id" });
    }
    req.params.id = id;
    next();
}
