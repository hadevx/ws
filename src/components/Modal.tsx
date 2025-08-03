import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure } from "@heroui/react";

export default function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = React.useState("blur");

  const handleOpen = (backdrop) => {
    setBackdrop(backdrop);
    onOpen();
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          className="capitalize"
          color="warning"
          variant="flat"
          onPress={() => handleOpen("blur")}>
          سياسة الخصوصية
        </Button>
      </div>
      <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
        <ModalContent className="bg-white dark:bg-gray-900 shadow-lg h-[700px]  mx-auto my-auto overflow-scroll">
          {(onClose) => (
            <>
              <ModalHeader className="fle text-lg flex-col gap-1 text-right" dir="rtl">
                سياسة الخصوصية – Webschema
              </ModalHeader>
              <ModalBody className="text-right leading-relaxed space-y-4" dir="rtl">
                <p>
                  في Webschema، نحرص على خصوصيتك ونسعى لحماية بياناتك الشخصية بأعلى المعايير. توضح
                  هذه السياسة كيفية جمع واستخدام وحماية المعلومات التي تقدمها لنا عند استخدامك
                  لخدماتنا أو زيارتك لموقعنا الإلكتروني.
                </p>

                <p>1. المعلومات التي نجمعها:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>الاسم الكامل</li>
                  <li>البريد الإلكتروني</li>
                  <li>رقم الهاتف</li>
                  <li>اسم الشركة (إن وجد)</li>
                  <li>تفاصيل المشروع أو الاستفسار</li>
                  <li>أي معلومات أخرى تختار تقديمها</li>
                </ul>

                <p>2. كيفية استخدام المعلومات:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>التواصل معك والرد على استفساراتك</li>
                  <li>تقديم عروض الأسعار والخدمات المطلوبة</li>
                  <li>تحسين خدماتنا وتجربة المستخدم</li>
                  <li>الأغراض التسويقية (بموافقتك المسبقة)</li>
                </ul>

                <p>3. حماية البيانات:</p>
                <p>
                  نلتزم بتأمين معلوماتك الشخصية باتخاذ الإجراءات الفنية والتنظيمية المناسبة لمنع
                  الوصول غير المصرح به أو استخدامها بطريقة غير قانونية.
                </p>

                <p>4. مشاركة المعلومات:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>إذا طلبت منا ذلك بشكل صريح</li>
                  <li>إذا تطلب الأمر ذلك قانونياً</li>
                  <li>مع شركائنا الموثوقين لأغراض تنفيذ الخدمة فقط</li>
                </ul>

                <p>5. ملفات تعريف الارتباط (Cookies):</p>
                <p>
                  قد يستخدم موقعنا ملفات تعريف الارتباط لتحسين تجربة المستخدم وتحليل حركة المرور.
                  يمكنك تعطيل هذه الملفات من خلال إعدادات المتصفح.
                </p>

                <p>6. حقوقك:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>طلب نسخة من بياناتك الشخصية</li>
                  <li>طلب تعديل أو حذف بياناتك</li>
                  <li>سحب الموافقة على استخدام بياناتك في أي وقت</li>
                </ul>

                <p>7. التعديلات على السياسة:</p>
                <p>
                  قد نقوم بتحديث سياسة الخصوصية من وقت لآخر، وسيتم نشر أي تغييرات على هذه الصفحة.
                  ننصحك بمراجعتها بشكل دوري.
                </p>

                <p>8. التواصل معنا:</p>
                <p>
                  إذا كان لديك أي استفسار بخصوص سياسة الخصوصية أو استخدام بياناتك، يمكنك التواصل
                  معنا عبر:
                  <br />
                  📧 البريد الإلكتروني: info@webschema.com
                  <br />
                  📞 الهاتف: +965 1234 5678
                </p>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
