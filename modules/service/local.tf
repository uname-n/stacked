resource "local_file" "cognito_auth" {
    content = <<EOF
export const COGNITO = {
    REGION: "${data.aws_region.current.name}",
    USER_POOL_ID: "${aws_cognito_user_pool.cognito_user_pool.id}",
    APP_CLIENT_ID: "${aws_cognito_user_pool_client.cognito_user_pool_client.id}",
};
    EOF
    filename = "${path.root}/src/react-app/src/configs/aws.js"
}