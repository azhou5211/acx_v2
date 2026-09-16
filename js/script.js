// ACX Industries — shared site script

document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Contact form
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = document.getElementById('form-status');

      // NOTE FOR SITE OWNER:
      // This form is wired to run client-side only. Static hosts (e.g. Cloudflare
      // Pages) cannot process a form POST on their own. Before launch, connect a
      // real submit endpoint — for example:
      //   1) A form backend such as Formspree, Basin, or Getform: set this
      //      form's "action" to the endpoint they give you and remove
      //      preventDefault() above so it posts normally, OR
      //   2) A Cloudflare Pages Function (/functions/api/contact.js) that
      //      sends the fields via email (e.g. through the Zoho Mail SMTP/API),
      //      called here with fetch('/api/contact', {method:'POST', body:...}).
      // Until one of those is wired up, submissions below only log locally
      // and open the visitor's email client as a fallback.

      var data = new FormData(form);
      var name = data.get('name') || '';
      var email = data.get('email') || '';
      var company = data.get('company') || '';
      var interest = data.get('interest') || '';
      var message = data.get('message') || '';

      var subject = encodeURIComponent('Website inquiry: ' + (interest || 'General'));
      var body = encodeURIComponent(
        'Name: ' + name + '\n' +
        'Company: ' + company + '\n' +
        'Email: ' + email + '\n' +
        'Interest: ' + interest + '\n\n' +
        message
      );

      status.textContent = 'Thanks — opening your email client to send this to our sales team.';
      status.className = 'form-status ok';

      window.location.href = 'mailto:Sales@acxindustries.com?subject=' + subject + '&body=' + body;
    });
  }
});
