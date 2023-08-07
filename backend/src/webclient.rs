use actix_web::{guard, HttpResponse, web};

mod page;
mod app;

pub fn configure(cfg: &mut web::ServiceConfig)
{
    cfg.service(web::resource("/").guard(guard::Get()).to(page::app::respond));
    cfg.service(web::resource("/some_other_page").guard(guard::Get()).to(page::app::respond));

    cfg.service(actix_files::Files::new("/assets", "./app/dist").guard(guard::Get()).show_files_listing());

    cfg.default_service(web::route().guard(guard::Not(guard::Get())).to(HttpResponse::MethodNotAllowed));
    cfg.default_service(web::route().guard(guard::Get()).to(page::app::respond_not_found));
}