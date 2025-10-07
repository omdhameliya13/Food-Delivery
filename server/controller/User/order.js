import Order from "../../models/User/order.js";
import Cart from "../../models/User/cart.js";
import Menu from "../../models/HomeChef/menu.js";

// Create order from cart
export const createOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const { deliveryType, deliveryAddress, contactNumber, specialInstructions } = req.body;

        // Get user's cart
        const cart = await Cart.findOne({ userId }).populate('items.itemId');
        
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        // Calculate total and prepare order items
        let totalAmount = 0;
        const orderItems = [];
        let chefId = null;

        for (const item of cart.items) {
            if (!item.itemId) {
                continue;
            }
            
            // All items should be from the same chef
            if (!chefId) {
                chefId = item.itemId.chefId;
            } else if (chefId.toString() !== item.itemId.chefId.toString()) {
                return res.status(400).json({ 
                    message: "All items must be from the same chef" 
                });
            }

            const itemTotal = item.itemId.price * item.quantity;
            totalAmount += itemTotal;

            orderItems.push({
                itemId: item.itemId._id,
                quantity: item.quantity,
                price: item.itemId.price
            });
        }

        // Create order
        const order = await Order.create({
            userId,
            items: orderItems,
            totalAmount,
            deliveryType,
            deliveryAddress: deliveryType === 'delivery' ? deliveryAddress : undefined,
            contactNumber,
            specialInstructions,
            chefId,
            estimatedDeliveryTime: new Date(Date.now() + 60 * 60 * 1000) // 1 hour from now
        });

        // Clear cart after order
        cart.items = [];
        await cart.save();

        const populatedOrder = await Order.findById(order._id)
            .populate('items.itemId')
            .populate('userId', 'name email phone')
            .populate('chefId', 'name email phone');

        return res.status(201).json({ 
            message: "Order created successfully", 
            order: populatedOrder 
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error creating order", error: error.message });
    }
};

// Get user's orders
export const getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        
        const orders = await Order.find({ userId })
            .populate('items.itemId')
            .populate('chefId', 'name email phone chefProfile')
            .sort({ createdAt: -1 });

        return res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error fetching orders" });
    }
};

// Get single order by ID
export const getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;
        const userId = req.user.id;

        const order = await Order.findOne({ _id: orderId, userId })
            .populate('items.itemId')
            .populate('userId', 'name email phone address')
            .populate('chefId', 'name email phone chefProfile');

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        return res.status(200).json(order);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error fetching order" });
    }
};

// Cancel order (only if status is pending or confirmed)
export const cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const userId = req.user.id;

        const order = await Order.findOne({ _id: orderId, userId });

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        if (!['pending', 'confirmed'].includes(order.status)) {
            return res.status(400).json({ 
                message: "Cannot cancel order in current status" 
            });
        }

        order.status = 'cancelled';
        await order.save();

        return res.status(200).json({ 
            message: "Order cancelled successfully", 
            order 
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error cancelling order" });
    }
};

// Get chef's orders
export const getChefOrders = async (req, res) => {
    try {
        const chefId = req.user.id;

        const orders = await Order.find({ chefId })
            .populate('items.itemId')
            .populate('userId', 'name email phone address')
            .sort({ createdAt: -1 });

        return res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error fetching chef orders" });
    }
};

// Update order status (for chef)
export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const chefId = req.user.id;

        const validStatuses = ['pending', 'confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered', 'cancelled'];
        
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const order = await Order.findOne({ _id: orderId, chefId });

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.status = status;
        await order.save();

        const updatedOrder = await Order.findById(orderId)
            .populate('items.itemId')
            .populate('userId', 'name email phone address');

        return res.status(200).json({ 
            message: "Order status updated", 
            order: updatedOrder 
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error updating order status" });
    }
};
