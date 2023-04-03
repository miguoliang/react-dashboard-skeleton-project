#!/bin/bash

sed -i "s/^\(.*\)\.propTypes/type \1Props/g" $1

sed -i "s/PropTypes\.bool/boolean/g" $1
sed -i "s/PropTypes\.string/string/g" $1
sed -i "s/PropTypes\.func/FunctionType/g" $1
sed -i "s/PropTypes\.number/number/g" $1
sed -i "s/PropTypes\.object/object/g" $1
sed -i "s/PropTypes\.node/ReactNode/g" $1
sed -i "s/PropTypes\.oneOfType(\[\(.*\)\])/\1/g" $1
sed -i "s/PropTypes\.oneOf(\[\(.*\)\])/\1/g" $1
sed -i "s/PropTypes\.arrayOf(\(.*\))/\1[]/g" $1