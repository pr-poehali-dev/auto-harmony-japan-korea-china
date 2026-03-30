import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки с сайта на почту владельца"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    car = body.get('car', '').strip()
    country = body.get('country', '').strip()
    comment = body.get('comment', '').strip()

    if not name or not phone:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'required'})
        }

    smtp_user = 'exalted.man555@gmail.com'
    smtp_password = os.environ['SMTP_PASSWORD']

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка с сайта — {name}'
    msg['From'] = smtp_user
    msg['To'] = smtp_user

    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #f97316; padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="color: white; margin: 0;">🚗 Новая заявка — Гармония Авто</h2>
        </div>
        <div style="background: #1a1a1a; padding: 24px; border-radius: 0 0 8px 8px; color: #fff;">
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 10px 0; color: #999; width: 140px;">Имя</td>
                    <td style="padding: 10px 0; color: #fff; font-weight: bold;">{name}</td>
                </tr>
                <tr style="border-top: 1px solid #333;">
                    <td style="padding: 10px 0; color: #999;">Телефон</td>
                    <td style="padding: 10px 0; color: #f97316; font-weight: bold; font-size: 18px;">{phone}</td>
                </tr>
                {"" if not car else f'<tr style="border-top: 1px solid #333;"><td style="padding: 10px 0; color: #999;">Автомобиль</td><td style="padding: 10px 0; color: #fff;">{car}</td></tr>'}
                {"" if not country else f'<tr style="border-top: 1px solid #333;"><td style="padding: 10px 0; color: #999;">Страна</td><td style="padding: 10px 0; color: #fff;">{country}</td></tr>'}
                {"" if not comment else f'<tr style="border-top: 1px solid #333;"><td style="padding: 10px 0; color: #999;">Комментарий</td><td style="padding: 10px 0; color: #fff;">{comment}</td></tr>'}
            </table>
        </div>
    </div>
    """

    msg.attach(MIMEText(html, 'html'))

    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, smtp_user, msg.as_string())

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True})
    }