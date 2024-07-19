from aiogram.types import InlineKeyboardButton as IKB, InlineKeyboardMarkup as IKM


def get_roles_kb() -> IKM:
    return IKM(inline_keyboard=[
        [IKB(text='Заказчик', callback_data='customer')],
        [IKB(text='Исполнитель', callback_data='contractor')]
    ])