from django.shortcuts import render

def home(request):
    return render(request, 'home.html')

def services(request):
    return render(request, 'services.html')

def cases(request):
    return render(request, 'cases.html')

def article_list(request):
    return render(request, 'blog_list.html')

def about(request):
    return render(request, 'about.html')

def faq(request):
    return render(request, 'faq.html')

def contacts(request):
    # TODO: Додати обробку форми зворотного зв'язку
    return render(request, 'contacts.html')
