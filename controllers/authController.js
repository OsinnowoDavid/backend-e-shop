const registeruser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const exist = await userModel.findOne({ email });

        if (exist) {
            return res.json({ success: false, message: "User already exists" });
        }

        // Validating email and strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        if (password?.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        // Hashing user's password
        const salt = await bcrypt.genSalt(10);
        if (!salt) {
            throw new Error("Failed to generate salt");
        }

        const hashedpassword = await bcrypt.hash(password, salt);
        if (!hashedpassword) {
            throw new Error("Failed to hash password");
        }

        const newuser = new userModel({
            name,
            email,
            password: hashedpassword
        });

        const user = await newuser.save();

        const token = createtoken(user._id);

        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};