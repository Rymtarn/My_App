import { FC } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { MyInput } from './ui/MyInput';

const LoginSchema = z.object({
    userName: z.string().min(3),
    password: z.string().min(5)
    // add more field
});

type LoginModel = z.infer<typeof LoginSchema>;

export const Login: FC = () => {
    // call hooks
    const { control, handleSubmit, reset } = useForm<LoginModel>({
        defaultValues: {
            userName: '',
            password: ''
        },
        resolver: zodResolver(LoginSchema)
    });

    // when reset press
    const whenResetPress = () => {
        reset();
    }

    // when validate pass
    const whenValidatePass: SubmitHandler<LoginModel> = (user) => {
        // your logic when validate pass
        // send data to api server
        console.log(user);
    }
    // when validate fail
    const whenValidateFail: SubmitErrorHandler<LoginModel> = (error) => {
        // your logic when validate fail
        // notify to user
        console.log(error);
    }

    return <>
          <View className ='flex flex-col bg-white w-screen md:bg-black h-full py-16 px-8'>
            <Text 
                className=' border-green-200 border-t-4 border-b-4  text-3xl text-center text-green-800 font-bold'>Login page</Text>
            <Text className=' text-purple-600 text-center text-xl font-bold my-7 '>@ Welcome To My App @</Text>

            <MyInput name='userName' control={control} label="ผู้ใช้งาน" />
            <MyInput name='password' control={control} isSecure={true} label='รหัสผ่าน' />

            <View className='flex flex-row space-x-2'>
                <Pressable
                    onPress={handleSubmit(whenValidatePass, whenValidateFail)}
                    className='border-2 border-green-600 bg-green-300 py-2 rounded-md my-2 flex-[1]'>
                    <Text className='text-green-800 text-center font-semibold'>เข้าสู่ระบบ</Text>
                </Pressable>

                <Pressable
                    onPress={whenResetPress}
                    className='border-2 border-amber-500 bg-yellow-300 py-2 rounded-md my-2 flex-1'>
                    <Text className='text-amber-800 text-center font-semibold'>ยกเลิก</Text>
                </Pressable>
            </View>

        </View>
    </>

}