import mongoose, { Schema, model, Model } from 'mongoose';



const productSchema = new Schema({
    name: { type: String, required: true, default: '' },
    percentage: { type: Number, required: true, min: 0, max: 30 },
    user: { type: String }
}, {
    timestamps: true
});


productSchema.index({ title: 'text', tags: 'text' });


const DiscountPrice = mongoose.models.DiscountPrice || model('DiscountPrice', productSchema);


export default DiscountPrice;