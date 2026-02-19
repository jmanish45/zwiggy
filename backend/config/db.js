
import mongoose from 'mongoose' ;

export const connectdb = async () => {
    await mongoose.connect('mongodb+srv://jmanish2406:9284564134@zwiggycluster.lyftefa.mongodb.net/zwiggy').then(()=> console.log("DB Connected")) ;
}