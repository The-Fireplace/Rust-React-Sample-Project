use actix_web::HttpResponse;
use askama::Template;

#[derive(Template)]
#[template(path = "app.html")]
struct AppTemplate<> {}

pub async fn respond() -> HttpResponse {
    HttpResponse::Ok().body(get_body())
}

pub async fn respond_not_found() -> HttpResponse {
    HttpResponse::NotFound().body(get_body())
}

fn get_body() -> String {
    let page_body = AppTemplate {};
    page_body.render().expect("Body should always be able to render.")
}