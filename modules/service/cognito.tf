resource "aws_cognito_user_pool" "cognito_user_pool" {
  name = "${random_pet.service_name.id}-cognito-user-pool"

  admin_create_user_config {
    allow_admin_create_user_only = false
  }

  username_attributes      = ["email"]
  auto_verified_attributes = ["email"]

  schema {
    attribute_data_type = "String"
    mutable             = true
    name                = "email"
    required            = true
  }

  password_policy {
    minimum_length    = "8"
    require_lowercase = true
    require_numbers   = true
    require_symbols   = true
    require_uppercase = true
  }

  device_configuration {
    challenge_required_on_new_device      = true
    device_only_remembered_on_user_prompt = true
  }

  mfa_configuration = "OFF"

  user_pool_add_ons {
    advanced_security_mode = "ENFORCED"
  }

  user_attribute_update_settings {
    attributes_require_verification_before_update = ["email"]
  }

  verification_message_template {
    default_email_option = "CONFIRM_WITH_CODE"
    email_subject        = "Verification Code"
    email_message        = "{####}"
  }

  account_recovery_setting {
    recovery_mechanism {
      name     = "verified_email"
      priority = 1
    }
  }

}

resource "aws_cognito_user_pool_client" "cognito_user_pool_client" {
  name         = "${random_pet.service_name.id}-cognito-user-pool-client"
  user_pool_id = aws_cognito_user_pool.cognito_user_pool.id

  prevent_user_existence_errors = "ENABLED"
  refresh_token_validity        = 90
  generate_secret               = false

  explicit_auth_flows = [
    "ALLOW_USER_PASSWORD_AUTH",
    "ALLOW_USER_SRP_AUTH",
    "ALLOW_REFRESH_TOKEN_AUTH"
  ]
}
