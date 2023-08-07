use actix_web::{HttpResponse, Responder, web};

mod controller;

pub fn configure(cfg: &mut web::ServiceConfig)
{
    cfg.service(controller::some_controller::some_endpoint);
    cfg.default_service(web::route().to(respond_not_found));
}

async fn respond_not_found() -> impl Responder {
    HttpResponse::NotFound().finish()
}