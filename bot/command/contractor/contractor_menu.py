from aiogram.types import Message, FSInputFile
from aiogram.types import InlineKeyboardButton as IKB, InlineKeyboardMarkup as IKM

import config as cf


async def send_contractor_menu(message: Message) -> None:

    menu_text = '''
<b>МЕНЮ "ИСПОЛНИТЕЛЬ" 👨‍🔧</b>
    
Здесь вы можете посмотреть свои актуальные заявки на ремонт оборудования от менеджера
'''

    kb = IKM(inline_keyboard=[
        [IKB(text='Посмотреть заявки 📋', callback_data='contractor_requests')],
        [IKB(text='Посмотреть маршрутный лист 📍', callback_data='contractor_itinerary')]
    ])

    file = FSInputFile(path=f"./{cf.IMG_PATH}/photo_2024-08-21_17-47-00.jpg", filename="фото.jpg")
    await message.answer_photo(photo=file, caption=menu_text, reply_markup=kb)
