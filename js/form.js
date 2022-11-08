$(
  (function () {
    $('.modal').submit(function (event) {
      event.preventDefault();

      // Ссылка, которую получили на этапе публикации приложения
      let appLink =
        'https://script.google.com/macros/s/AKfycbzeITkd35jKrIwwwbHqrGjHTCxGnhHL03nDV1ck/exec';

      //body
      let body = $('body');

      //активная форма
      let formVisible = $('.modal__wrapper');

      // Id текущей формы
      let form = $('#' + $(this).attr('id'))[0];

      // FormData
      let fd = new FormData(form);

      $.ajax({
        url: appLink,
        type: 'POST',
        data: fd,
        processData: false,
        contentType: false,
        beforeSend: function () {
          if (fd.get('honeypot').length) {
            return false;
          } else {
            fd.delete('honeypot');
            fd.delete('Согласие');
          }
          // валидация других полей.
        },
      }).done(function (res, textStatus, jqXHR) {
        if (jqXHR.readyState === 4 && jqXHR.status === 200) {
          // Очищаем поля формы
          form.reset();
          body.removeClass('lock');
          formVisible.removeClass('active');

          document.querySelector('.modal__checkbox').checked = false;
          document.querySelector('.modal__form-btn').disabled = true;

          var link = document.createElement('a');
          link.href = 'https://t.me/mnmaker_bot';
          link.setAttribute('target', '_blank');
          link.click();
          link.remove();
        }
      });
    });
  })(jQuery),
);
