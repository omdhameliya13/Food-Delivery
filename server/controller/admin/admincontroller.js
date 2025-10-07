import Order from "../../models/User/order.js";
import Menu from "../../models/HomeChef/menu.js";
import Usermodel from "../../models/user.js";

// Get all orders
export const getAllOrders = async (req, res) => {
    try {
        const { status, startDate, endDate } = req.query;
        
        let query = {};
        
        if (status) {
            query.status = status;
        }
        
        if (startDate || endDate) {
            query.createdAt = {};
            if (startDate) query.createdAt.$gte = new Date(startDate);
            if (endDate) query.createdAt.$lte = new Date(endDate);
        }

        const orders = await Order.find(query)
            .populate('items.itemId')
            .populate('userId', 'name email phone')
            .populate('chefId', 'name email phone')
            .sort({ createdAt: -1 });

        return res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error fetching orders" });
    }
};

// Get all menus
export const getAllMenus = async (req, res) => {
    try {
        const { available, chefId } = req.query;
        
        let query = {};
        
        if (available !== undefined) {
            query.available = available === 'true';
        }
        
        if (chefId) {
            query.chefId = chefId;
        }

        const menus = await Menu.find(query)
            .populate('chefId', 'name email phone chefProfile')
            .sort({ createdAt: -1 });

        return res.status(200).json(menus);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error fetching menus" });
    }
};

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const { role } = req.query;
        
        let query = {};
        if (role) {
            query.role = role;
        }

        const users = await Usermodel.find(query).select('-password');

        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error fetching users" });
    }
};

// Get all home chefs
export const getAllChefs = async (req, res) => {
    try {
        const chefs = await Usermodel.find({ role: 'homechef' }).select('-password');
        return res.status(200).json(chefs);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error fetching chefs" });
    }
};

// Get dashboard statistics
export const getDashboardStats = async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();
        const totalUsers = await Usermodel.countDocuments({ role: 'user' });
        const totalChefs = await Usermodel.countDocuments({ role: 'homechef' });
        const totalMenuItems = await Menu.countDocuments();
        
        const pendingOrders = await Order.countDocuments({ status: 'pending' });
        const completedOrders = await Order.countDocuments({ status: 'delivered' });
        
        const totalRevenue = await Order.aggregate([
            { $match: { status: 'delivered' } },
            { $group: { _id: null, total: { $sum: '$totalAmount' } } }
        ]);

        const recentOrders = await Order.find()
            .populate('userId', 'name email')
            .populate('chefId', 'name email')
            .sort({ createdAt: -1 })
            .limit(10);

        return res.status(200).json({
            stats: {
                totalOrders,
                totalUsers,
                totalChefs,
                totalMenuItems,
                pendingOrders,
                completedOrders,
                totalRevenue: totalRevenue[0]?.total || 0
            },
            recentOrders
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error fetching dashboard stats" });
    }
};

// Delete user (admin only)
export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        
        const user = await Usermodel.findByIdAndDelete(userId);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error deleting user" });
    }
};

// Update order status (admin can update any order)
export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const order = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        ).populate('items.itemId')
         .populate('userId', 'name email')
         .populate('chefId', 'name email');

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        return res.status(200).json({ 
            message: "Order status updated", 
            order 
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error updating order status" });
    }
};
