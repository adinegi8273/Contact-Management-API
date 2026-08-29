import {Pool} from "pg";

const pool = new Pool({

    "connectionString":"postgresql://postgres:123@localhost/Contact"
});

let res = await pool.query(`
    
    INSERT INTO contacts (name, email, phone_number, address, company)
    VALUES
    ('Ananya Reddy','ananya.reddy@example.com','9845123670','14 Jubilee Hills, Hyderabad','Skyline Technologies'),
    ('Karan Mehta','karan.mehta@example.com','9765432109','29 Satellite Road, Ahmedabad','Meta Innovations'),
    ('Divya Nair','divya.nair@example.com','9876123450','8 Marine Drive, Kochi','Coastal Solutions'),
    ('Rohan Gupta','rohan.gupta@example.com','9988001122','67 Civil Lines, Lucknow','Nexus Systems Ltd'),
    ('Ishita Bose','ishita.bose@example.com','9432187650','19 Salt Lake, Kolkata','Bright Path Consulting'),
    ('Arjun Malhotra','arjun.malhotra@example.com','9911223344','33 Model Town, Delhi','Apex Enterprises'),
    ('Neha Kapoor','neha.kapoor@example.com','9822334455','5 Camp Road, Pune','Zenith Software'),
    ('Siddharth Rao','siddharth.rao@example.com','9765098234','101 Banjara Hills, Hyderabad','InfoWave Technologies'),
    ('Pooja Desai','pooja.desai@example.com','9898765432','44 Vastrapur, Ahmedabad','GreenLeaf Enterprises'),
    ('Manish Joshi','manish.joshi@example.com','9012345670','76 MI Road, Jaipur','Quantum Analytics'),
    ('Kavya Menon','kavya.menon@example.com','9645123789','12 Panampilly Nagar, Kochi','Oceanic Systems'),
    ('Aditya Kumar','aditya.kumar@example.com','9123098765','58 Boring Road, Patna','Prime Solutions'),
    ('Ritika Chawla','ritika.chawla@example.com','9887766554','21 Sector 17, Chandigarh','Elevate Consulting'),
    ('Varun Pillai','varun.pillai@example.com','9765123408','9 Anna Nagar, Chennai','TechSphere Pvt Ltd'),
    ('Shreya Agarwal','shreya.agarwal@example.com','9876540987','30 Rajouri Garden, Delhi','Pinnacle Industries'),
    ('Nikhil Bansal','nikhil.bansal@example.com','9990011223','15 Gomti Nagar, Lucknow','Fusion Technologies'),
    ('Tanvi Shah','tanvi.shah@example.com','9823456701','67 Navrangpura, Ahmedabad','Bright Star Solutions'),
    ('Harsh Vardhan','harsh.vardhan@example.com','9765432198','40 Alkapuri, Vadodara','NextGen Systems'),
    ('Meera Krishnan','meera.krishnan@example.com','9445123670','88 T Nagar, Chennai','SilverLine Enterprises'),
    ('Yash Trivedi','yash.trivedi@example.com','9988112233','25 Vaishali Nagar, Jaipur','Momentum Innovations');

`)

console.log("Data Inserted Successfully");